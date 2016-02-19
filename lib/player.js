
import { readBlobAsArrayBuffer } from './util'

class Player {
  constructor() {
    this.ctx = new AudioContext()
  }

  load(url) {
    const loadBlob = (blob) => {
      return readBlobAsArrayBuffer(blob)
        .then(buffer => new Promise(resolve => {
          this.ctx.decodeAudioData(buffer, data => {
            resolve(data)
          })
        }))
        .then(buffer => this.buffer = buffer)
    }

    if (url instanceof Blob) {
      return loadBlob(url)
    }

    return fetch(url)
      .then(res => res.blob())
      .then(loadBlob)
  }

  play() {
    const source = this.ctx.createBufferSource()
    source.buffer = this.buffer
    source.connect(this.ctx.destination)
    source.start()
  }

  stop() {
    // TODO ...
  }

  pause() {
    // TODO ...
  }
}

export default Player
