
import { AudioPlayer } from '..'

const player = new AudioPlayer()

player
  .load('/xx.mp3')
  .then(() => player.play())
