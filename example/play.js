
import { Audio } from '..'

const audio = new Audio()

audio
  .load('/xx.mp3')
  .then(() => audio.play())
