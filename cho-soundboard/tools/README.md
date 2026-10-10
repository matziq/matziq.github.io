# Audio generator

`make_audio.py` regenerates `../audio/NN.mp3` from the `LINES` in `../index.html`.
It is not loaded by the page.

Voice: `en-US-ChristopherNeural` (edge-tts), rate -15%, pitch -20Hz. Output is then
post-processed: the WORLD vocoder (pyworld) compresses the F0 contour to about 6%
of its natural variation, and an envelope follower flattens energy. Sentences get
280 ms pauses.

```
pip install edge-tts pyworld numpy scipy soundfile imageio-ffmpeg
python make_audio.py --stats
```
