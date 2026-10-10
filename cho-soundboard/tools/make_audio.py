"""Regenerate cho-soundboard/audio/NN.mp3 with a deadpan, near-monotone voice.

Pipeline per line: edge-tts (low male neural voice, slowed) -> WORLD vocoder
F0 compression (keeps ~KEEP of natural pitch movement) -> energy flattening ->
MP3 via ffmpeg. Lines are read from the LINES object in ../index.html.

Setup:  pip install edge-tts pyworld numpy scipy soundfile imageio-ffmpeg
Run:    python make_audio.py --stats    (prints F0 std before/after per line)
"""
import asyncio, json, re, subprocess, sys, tempfile
from pathlib import Path

import numpy as np
import pyworld as pw
import soundfile as sf
import edge_tts
import imageio_ffmpeg
from scipy.ndimage import uniform_filter1d

VOICE = "en-US-ChristopherNeural"
RATE = "-15%"
PITCH = "-20Hz"
KEEP = 0.06          # fraction of natural F0 variation (log domain) retained
PAUSE_S = 0.28       # silence between sentences
SR = 24000
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = Path(__file__).resolve().parent.parent


def load_lines():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    body = re.search(r"const LINES=(\{.*?\n\});", html, re.S).group(1)
    return [t for arr in json.loads(body).values() for t in arr]


def ffmpeg(args):
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", *args], check=True)


async def synth(text, tmp):
    mp3 = tmp / "raw.mp3"
    await edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH).save(str(mp3))
    wav = tmp / "raw.wav"
    ffmpeg(["-i", str(mp3), "-ar", str(SR), "-ac", "1", str(wav)])
    y, _ = sf.read(str(wav))
    return y.astype(np.float64)


def f0_std_cents(f0):
    v = f0[f0 > 0]
    return float(np.std(1200 * np.log2(v / np.median(v)))) if len(v) > 5 else 0.0


def analyze(y):
    f0, t = pw.harvest(y, SR, f0_floor=60, f0_ceil=250, frame_period=5.0)
    return f0, pw.cheaptrick(y, f0, t, SR), pw.d4c(y, f0, t, SR)


def flatten_pitch(f0, sp, ap, target):
    voiced = f0 > 0
    new = f0.copy()
    if voiced.sum() > 5:
        lf = np.log(f0[voiced])
        smooth = uniform_filter1d(lf, 15, mode="nearest")
        med = np.median(lf)
        new[voiced] = np.exp(np.log(target) + KEEP * (smooth - med))
    return new, pw.synthesize(new, sp, ap, SR, frame_period=5.0)


def flatten_energy(y):
    env = np.sqrt(uniform_filter1d(y * y, int(0.04 * SR)) + 1e-10)
    env = uniform_filter1d(env, int(0.08 * SR))
    floor = np.percentile(env, 20)
    gain = np.clip(0.9 * np.median(env[env > floor]) / np.maximum(env, floor), 0.5, 4.0)
    y = np.tanh(y * gain * 1.2) / 1.2  # soft limit, no hard clipping
    return y * (10 ** (-3 / 20) / max(np.max(np.abs(y)), 1e-9))


def trim(y):
    idx = np.where(np.abs(y) > 0.01 * np.max(np.abs(y)))[0]
    pad = int(0.03 * SR)
    return y[max(idx[0] - pad, 0): idx[-1] + pad]


async def render(text, tmp):
    parts, before, after = [], [], []
    sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]
    ana = [analyze(await synth(s, tmp)) for s in sents]
    meds = [np.median(a[0][a[0] > 0]) for a in ana if (a[0] > 0).sum() > 5]
    target = float(np.exp(np.mean(np.log(meds)))) if meds else 100.0
    for f0, sp, ap in ana:
        new, out = flatten_pitch(f0, sp, ap, target)
        before.append(f0)
        after.append(new)
        parts += [trim(out), np.zeros(int(PAUSE_S * SR))]
    y = flatten_energy(np.concatenate(parts[:-1]))
    return y, f0_std_cents(np.concatenate(before)), f0_std_cents(np.concatenate(after))


async def main():
    out_dir = ROOT / "audio"
    out_dir.mkdir(exist_ok=True)
    rows = []
    with tempfile.TemporaryDirectory() as d:
        tmp = Path(d)
        for n, text in enumerate(load_lines(), 1):
            y, b, a = await render(text, tmp)
            sf.write(str(tmp / "out.wav"), y, SR)
            ffmpeg(["-i", str(tmp / "out.wav"), "-codec:a", "libmp3lame", "-b:a", "64k",
                    "-ac", "1", str(out_dir / f"{n:02d}.mp3")])
            rows.append((b, a))
            print(f"{n:02d} f0 std {b:6.0f} -> {a:5.0f} cents  {text}")
    if "--stats" in sys.argv:
        print("mean F0 std (cents): before %.0f after %.0f" %
              (np.mean([r[0] for r in rows]), np.mean([r[1] for r in rows])))


asyncio.run(main())
