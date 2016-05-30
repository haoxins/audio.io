
### audio.io

A tiny wraaper of audio APIs.

### Classes

* `AudioPlayer`

### Usage

* `AudioRecorder` - A tiny wraaper of `w3c MediaRecorder`

```js
import { AudioRecorder } from 'audio.io'

const recorder = new AudioRecorder()

recorder.start()

// ...

recorder
  .exportAudio()
  .then(audioBlob => ...)
```

* `AudioPlayer`

```js
import { AudioPlayer } from 'audio.io'

const player = new AudioPlayer()

player
  .load('your-url.mp3')
  .then(() => player.play())
```

### License
MIT
