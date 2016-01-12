
### audio.io

A tiny wraaper of audio APIs.

### Usage

```js
import { Audio } from 'audio.io'

const audio = new Audio()

audio
  .load('your-url.mp3')
  .then(() => audio.play())
```

### License
MIT
