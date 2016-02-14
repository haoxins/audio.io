
### audio.io

A tiny wraaper of audio APIs.

### Classes

* `AudioPlayer`

### Usage

* `AudioPlayer`

```js
import { AudioPlayer } from 'audio.io'

const player = new AudioPlayer()

player
  .load('your-url.mp3')
  .then(() => player.play())
```

* `AudioRecorder`

```js

import { AudioRecorder, getDownloadLink } from 'audio.io'

const recorder = new AudioRecorder({
  workerPath: 'build/recorder-worker.js'
})

recorder.start()

setTimeout(() => {
  recorder.stop()

  recorder
    .exportAudio()
    .then(audioBlob => getDownloadLink(audioBlob, 'kiku.wav'))
    .then(a => ...)
}, 60000)

```

### License
MIT
