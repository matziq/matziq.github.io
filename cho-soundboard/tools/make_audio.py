"""Generate generic TTS approximations of a dry, restrained delivery.

These are not Cho's actual voice and do not reproduce the actor's voice.

Engines
  edge   edge-tts low male neural voice, slowed, pitch lowered, text normalized
         to periods only (no ! or ?).
  piper  local Piper TTS with higher length_scale and low noise_scale/noise_w.
Post-processing (ffmpeg only, no resynthesis) is "dry": high-pass, low-shelf warmth,
gentle compression, slight low-pass, loudness normalization.
Optional "f0" mode applies mild WORLD F0 compression (KEEP of natural variation).

Setup:  pip install edge-tts piper-tts pyworld numpy scipy soundfile imageio-ffmpeg
Piper voices (.onnx + .onnx.json) go in --voices (default D:/AI_Output/cho-work/voices).

  python make_audio.py --compare   # build ../compare/audio/*.mp3 + stats JSON
  python make_audio.py --build     # build ../audio/NN.mp3 with the default variant
"""
import argparse, asyncio, json, re, subprocess, tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
import edge_tts
import imageio_ffmpeg

SR = 24000
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = Path(__file__).resolve().parent.parent
SAMPLE_LINES = [4, 11, 17]   # 1-based indexes: short, long, two-sentence

# Dry chain: no resynthesis, so no vocoder artifacts.
DRY = ("highpass=f=70,equalizer=f=140:t=h:width=140:g=3,equalizer=f=3200:t=q:width=1:g=-1.5,"
       "lowpass=f=7500,acompressor=threshold=-22dB:ratio=2.5:attack=15:release=200:makeup=2,"
       "loudnorm=I=-18:TP=-2:LRA=5,alimiter=limit=0.89")

DEFAULT = "edge-steffan-dry"

VARIANTS = {}
for v, short in [("Andrew", "andrew"), ("Christopher", "christopher"), ("Guy", "guy"),
                 ("Brian", "brian"), ("Eric", "eric"), ("Roger", "roger"),
                 ("Steffan", "steffan")]:
    VARIANTS[f"edge-{short}-dry"] = dict(
        group="A", engine="edge", voice=f"en-US-{v}Neural", rate="-15%", pitch="-8Hz",
        post="dry", label=f"edge-tts {v} (male)", note="rate -15%, pitch -8Hz, periods only, dry EQ/comp")
VARIANTS["edge-guy-f0-50"] = dict(
    group="B", engine="edge", voice="en-US-GuyNeural", rate="-15%", pitch="-8Hz",
    post="f0", keep=0.5, label="edge-tts Guy (male) + 50% F0 smoothing",
    note="WORLD F0 kept at 50% of natural variation, then dry EQ/comp")
VARIANTS["edge-andrew-f0-50"] = dict(
    group="B", engine="edge", voice="en-US-AndrewNeural", rate="-15%", pitch="-8Hz",
    post="f0", keep=0.5, label="edge-tts Andrew (male) + 50% F0 smoothing",
    note="WORLD F0 kept at 50% of natural variation, then dry EQ/comp")


def load_lines():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    body = re.search(r"const LINES=(\{.*?\n\});", html, re.S).group(1)
    return [t for arr in json.loads(body).values() for t in arr]


def normalize_text(t):
    t = re.sub(r"[!?]+", ".", t.replace("\u2026", "."))
    return re.sub(r"\.{2,}", ".", t)


def ffmpeg(args):
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", *args], check=True)


def read_wav(path):
    y, _ = sf.read(str(path))
    return y.astype(np.float64)


async def synth_edge(text, cfg, tmp):
    mp3, wav = tmp / "raw.mp3", tmp / "raw.wav"
    await edge_tts.Communicate(normalize_text(text), cfg["voice"], rate=cfg["rate"],
                               pitch=cfg["pitch"]).save(str(mp3))
    ffmpeg(["-i", str(mp3), "-ar", str(SR), "-ac", "1", str(wav)])
    return read_wav(wav)


_piper = {}


def synth_piper(text, cfg, tmp, voices):
    from piper import PiperVoice, SynthesisConfig
    if cfg["model"] not in _piper:
        _piper[cfg["model"]] = PiperVoice.load(str(voices / f"{cfg['model']}.onnx"))
    v = _piper[cfg["model"]]
    sc = SynthesisConfig(length_scale=cfg["length"], noise_scale=cfg["noise"],
                         noise_w_scale=cfg["noise_w"])
    pcm = np.concatenate([c.audio_float_array for c in v.synthesize(normalize_text(text), sc)])
    raw, wav = tmp / "praw.wav", tmp / "raw.wav"
    sf.write(str(raw), pcm, v.config.sample_rate)
    ffmpeg(["-i", str(raw), "-ar", str(SR), "-ac", "1", str(wav)])
    return read_wav(wav)


def f0_compress(y, keep):
    """Mild F0 compression: smooth the contour toward its median, keep `keep` of variation."""
    import pyworld as pw
    from scipy.ndimage import uniform_filter1d
    f0, t = pw.harvest(y, SR, f0_floor=60, f0_ceil=250, frame_period=5.0)
    sp, ap = pw.cheaptrick(y, f0, t, SR), pw.d4c(y, f0, t, SR)
    voiced = f0 > 0
    new = f0.copy()
    if voiced.sum() > 5:
        lf = np.log(f0[voiced])
        med = np.median(lf)
        new[voiced] = np.exp(med + keep * (uniform_filter1d(lf, 9, mode="nearest") - med))
    return pw.synthesize(new, sp, ap, SR, frame_period=5.0)


def f0_std_cents(y):
    import pyworld as pw
    f0, _ = pw.harvest(y, SR, f0_floor=60, f0_ceil=250, frame_period=5.0)
    v = f0[f0 > 0]
    return float(np.std(1200 * np.log2(v / np.median(v)))) if len(v) > 5 else 0.0


def finish(y, out_mp3, tmp, bitrate):
    y = y / max(np.max(np.abs(y)), 1e-9) * 0.7
    sf.write(str(tmp / "pre.wav"), y, SR)
    ffmpeg(["-i", str(tmp / "pre.wav"), "-af", DRY, "-codec:a", "libmp3lame",
            "-b:a", bitrate, "-ac", "1", str(out_mp3)])


async def render(text, cfg, out_mp3, tmp, voices, bitrate="48k"):
    if cfg["engine"] == "edge":
        y = await synth_edge(text, cfg, tmp)
    else:
        y = synth_piper(text, cfg, tmp, voices)
    if cfg["post"] == "f0":
        y = f0_compress(y, cfg["keep"])
    finish(y, out_mp3, tmp, bitrate)


def analyze_mp3(path, tmp):
    ffmpeg(["-i", str(path), "-ar", str(SR), "-ac", "1", str(tmp / "chk.wav")])
    y = read_wav(tmp / "chk.wav")
    spec = np.abs(np.fft.rfft(y * np.hanning(len(y)))) ** 2
    fr = np.fft.rfftfreq(len(y), 1 / SR)
    tot = spec.sum() + 1e-12
    return dict(peak=float(np.max(np.abs(y))), clipped=int(np.sum(np.abs(y) >= 0.999)),
                f0_std_cents=f0_std_cents(y), dur=len(y) / SR,
                lowband=float(spec[(fr >= 60) & (fr < 1000)].sum() / tot),
                hf8k=float(spec[fr > 8000].sum() / tot))


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--compare", action="store_true")
    ap.add_argument("--build", action="store_true")
    ap.add_argument("--variant", default=DEFAULT)
    ap.add_argument("--voices", default="D:/AI_Output/cho-work/voices")
    a = ap.parse_args()
    voices, lines = Path(a.voices), load_lines()
    stats = {}
    with tempfile.TemporaryDirectory() as d:
        tmp = Path(d)
        if a.compare:
            out = ROOT / "compare" / "audio"
            out.mkdir(parents=True, exist_ok=True)
            for key, cfg in VARIANTS.items():
                for n in SAMPLE_LINES:
                    p = out / f"{key}-{n:02d}.mp3"
                    await render(lines[n - 1], cfg, p, tmp, voices)
                    s = analyze_mp3(p, tmp)
                    stats[f"{key}-{n:02d}"] = s
                    print(f"{key:20s} {n:02d} f0std {s['f0_std_cents']:5.0f}c peak {s['peak']:.2f} "
                          f"clip {s['clipped']} hf8k {s['hf8k']:.4f}")
            (out / "stats.json").write_text(json.dumps(stats, indent=1))
        if a.build:
            cfg = VARIANTS[a.variant]
            out = ROOT / "audio"
            out.mkdir(exist_ok=True)
            for n, text in enumerate(lines, 1):
                p = out / f"{n:02d}.mp3"
                await render(text, cfg, p, tmp, voices, bitrate="64k")
                s = analyze_mp3(p, tmp)
                print(f"{n:02d} f0std {s['f0_std_cents']:5.0f}c peak {s['peak']:.2f} "
                      f"clip {s['clipped']} {text}")


asyncio.run(main())
