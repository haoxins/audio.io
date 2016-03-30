
import { AudioPlayer, MediaRecorder, getDownloadLink } from '..'

const recorder = new MediaRecorder()

const player = new AudioPlayer()

window.start = () => {
  recorder.start()
}

window.stop = () => {
  recorder.stop()
}

window.clearData = () => {
  recorder.clear()
}

window.exportAudio = () => {
  recorder
    .exportAudio()
    .then(audioBlob => getDownloadLink(audioBlob, 'kiku.ogg'))
    .then(a => document.querySelector('#link').appendChild(a))
}

window.play = () => {
  recorder
    .exportAudio()
    .then(audioBlob => player.load(audioBlob))
    .then(() => player.play())
}
