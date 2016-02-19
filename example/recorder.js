
import { AudioPlayer, AudioRecorder, getDownloadLink } from '..'

const recorder = new AudioRecorder({
  workerPath: '/build/recorder-worker.js'
})

const player = new AudioPlayer()

window.start = () => {
  recorder.start()
}

window.stop = () => {
  recorder.stop()
}

window.clear = () => {
  recorder.clear()
}

window.exportAudio = () => {
  recorder
    .exportAudio()
    .then(audioBlob => getDownloadLink(audioBlob, 'kiku.wav'))
    .then(a => document.querySelector('#link').appendChild(a))
}

window.play = () => {
  recorder
    .exportAudio()
    .then(audioBlob => player.load(audioBlob))
    .then(() => player.play())
}
