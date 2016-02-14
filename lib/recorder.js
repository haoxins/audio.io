
import { getUserAudioStream } from './util'

class Recorder {
  constructor(opts = {}) {
    this.opts = opts
    const bufferLength = opts.bufferLength || 4096
    const workerPath = opts.workerPath || 'recorder-worker.js'
    this.ctx = new AudioContext()
    this.processor = this.ctx.createScriptProcessor(bufferLength, 2, 2)

    const worker = this.worker = new Worker(workerPath)

    this.recording = false

    worker.postMessage({
      action: 'init',
      config: {
        sampleRate: this.ctx.sampleRate
      }
    })

    this.processor.onaudioprocess = e => {
      if (!this.recording) return

      worker.postMessage({
        action: 'record',
        buffer: [
          e.inputBuffer.getChannelData(0),
          e.inputBuffer.getChannelData(1)
        ]
      })
    }
  }

  loadUserAudio() {
    if (this.source) {
      return Promise.resolve(this.source)
    }

    return getUserAudioStream()
      .then(stream => {
        this.source = this.ctx.createMediaStreamSource(stream)
        this.source.connect(this.processor)
        // if the script processor is not connected to an output,
        // the 'onaudioprocess' event is not triggered in chrome
        this.processor.connect(this.ctx.destination)
      })
  }

  start() {
    return this
      .loadUserAudio()
      .then(() => this.recording = true)
  }

  stop() {
    this.recording = false
  }

  clear() {
    this.worker.postMessage({action: 'clear'})
  }

  exportAudio(type = 'audio/wav') {
    return new Promise((resolve, reject) => {
      const i = setTimeout(() => {
        reject(new Error('export audio timeout'))
      }, 5000)

      const onmessage = e => {
        const { type, data } = e.data

        if (type === 'audioBlob') {
          this.worker.removeEventListener('message', onmessage)
          clearTimeout(i)
          resolve(data)
        }
      }

      this.worker.addEventListener('message', onmessage)

      this.worker.postMessage({
        action: 'export',
        type
      })
    })
  }

  gain(g) {
    // TODO ...
    const gainNode = this.ctx.createGain()
    gainNode.gain.value = g

    this.source.connect(gainNode)
    gainNode.connect(this.ctx.destination)
  }

  save() {

  }
}

export default Recorder
