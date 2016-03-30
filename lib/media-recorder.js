
import { getUserAudioStream } from './util'

class MyMediaRecorder {
  constructor(opts = {}) {
    this.opts = opts
    this.chunks = []
  }

  init() {
    if (this.mediaRecorder) {
      return Promise.resolve()
    }

    return getUserAudioStream()
      .then(stream => {
        const recorder = this.mediaRecorder = new MediaRecorder(stream)

        recorder.ondataavailable = e => {
          this.chunks.push(e.data)
        }
      })
  }

  clear() {
    this.chunks = []
  }

  start() {
    return this
      .init()
      .then(() => {
        const state = this.mediaRecorder.state
        if (state === 'recording') {
          return
        }
        this.mediaRecorder.start()
      })
  }

  stop() {
    return this
      .init()
      .then(() => {
        const state = this.mediaRecorder.state
        if (state === 'inactive') {
          return
        }
        this.mediaRecorder.stop()
      })
  }

  exportAudio() {
    const blob = new Blob(this.chunks, {type: 'audio/ogg; codecs=opus'})
    return Promise.resolve(blob)
  }
}

export default MyMediaRecorder
