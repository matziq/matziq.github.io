# Audio generator

`make_audio.py` builds the soundboard audio from the `LINES` in `../index.html`.
It is not loaded by the page.

**Default (v3):** `edge-steffan-dry` = edge-tts `en-US-SteffanNeural`, rate -15%,
pitch -8Hz, text normalized to periods only (no `!` or `?`). No vocoder
resynthesis. Post chain (ffmpeg): high-pass 70 Hz, low-shelf +3 dB at 140 Hz,
-1.5 dB dip at 3.2 kHz, low-pass 7.5 kHz, gentle compressor (2.5:1), loudness
-18 LUFS, limiter 0.89. MP3 mono 64 kbps.

The earlier WORLD F0-flattening version (6% pitch variation) sounded robotic and
was dropped. The compare page (`../compare/`) has other candidates: seven edge-tts
voices, three Piper voices (length_scale 1.25, noise_scale 0.3, noise_w 0.4), and
two edge-tts voices with mild WORLD F0 smoothing (50% of natural variation).

```
pip install edge-tts piper-tts pyworld numpy scipy soundfile imageio-ffmpeg
python make_audio.py --compare   # rebuild ../compare/audio (48 kbps) and stats.json
python make_audio.py --build     # rebuild ../audio/NN.mp3 (use --variant NAME to change)
```
Piper models (`en_US-*-*.onnx` and `.onnx.json`) come from rhasspy/piper-voices on
Hugging Face; point `--voices` at the folder. Audio URLs in the page use `?v=3`.
