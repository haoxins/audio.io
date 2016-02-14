
import { AudioRecorder, getDownloadLink } from '..'

const recorder = new AudioRecorder({
  workerPath: '/build/recorder-worker.js'
})

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
