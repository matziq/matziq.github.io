# Audio generator

`make_audio.py` builds the soundboard audio from the `LINES` in `../index.html`.
It is not loaded by the page.

All voices are generic TTS approximations of a dry, restrained delivery. They are
not Cho's actual voice and do not reproduce the actor's voice. Browser fallback
voices are device-dependent and are not gender-verified comparison candidates.

**Default (v3):** `edge-steffan-dry` = edge-tts `en-US-SteffanNeural`, rate -15%,
pitch -8Hz, text normalized to periods only (no `!` or `?`). No vocoder
resynthesis. Post chain (ffmpeg): high-pass 70 Hz, low-shelf +3 dB at 140 Hz,
-1.5 dB dip at 3.2 kHz, low-pass 7.5 kHz, gentle compressor (2.5:1), loudness
-18 LUFS, limiter 0.89. MP3 mono 64 kbps.

The earlier WORLD F0-flattening version (6% pitch variation) sounded robotic and
was dropped. The compare page (`../compare/`) lists existing samples from seven
edge-tts voices whose service metadata reports `Gender: Male` (Andrew,
Christopher, Guy, Brian, Eric, Roger, Steffan), plus the existing Guy and Andrew
samples with mild WORLD F0 smoothing (50% of natural variation). No audio was
regenerated or pitch settings changed for the labeling correction.

Lessac-low is excluded after the female-voice correction. Piper Ryan-low and
Joe-medium are also excluded from the comparison and generator candidates:
their upstream model cards do not specify gender, so they are not treated as
verified male voices. `low` and `medium` describe model quality, not gender or
pitch. Historical Piper MP3s and analysis records remain on disk but are not
offered as candidates. Piper synthesis support remains available in the tool.
Model cards: [Ryan](https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_US/ryan/low/MODEL_CARD)
and [Joe](https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_US/joe/medium/MODEL_CARD).

```
pip install edge-tts piper-tts pyworld numpy scipy soundfile imageio-ffmpeg
python make_audio.py --compare   # rebuild ../compare/audio (48 kbps) and stats.json
python make_audio.py --build     # rebuild ../audio/NN.mp3 (use --variant NAME to change)
```
Piper models (`en_US-*-*.onnx` and `.onnx.json`) come from rhasspy/piper-voices on
Hugging Face; point `--voices` at the folder. Audio URLs in the page use `?v=3`.
