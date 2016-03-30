
let recLength = 0
let recBuffersL = []
let recBuffersR = []
let sampleRate

self.onmessage = e => {
  switch (e.data.action) {
    case 'init':
      init(e.data.config)
      break
    case 'record':
      record(e.data.buffer)
      break
    case 'export':
      exportAudio(e.data.type)
      break
    // case 'getBuffers':
    //   getBuffers()
    //   break
    case 'clear':
      clear()
      break
  }
}

function init(config) {
  sampleRate = config.sampleRate
}

function record(inputBuffer) {
  recBuffersL.push(inputBuffer[0])
  recBuffersR.push(inputBuffer[1])
  recLength += inputBuffer[0].length
}

function exportAudio(type) {
  // TODO: support other types, wav for now
  let bufferL = mergeBuffers(recBuffersL, recLength)
  let bufferR = mergeBuffers(recBuffersR, recLength)
  let interleaved = interleave(bufferL, bufferR)
  let dataview = encodeWAV(interleaved)
  let audioBlob = new Blob([dataview], {type})

  self.postMessage({
    type: 'audioBlob',
    data: audioBlob
  })
}

function getBuffers() {
  const buffers = []
  buffers.push(mergeBuffers(recBuffersL, recLength))
  buffers.push(mergeBuffers(recBuffersR, recLength))
  self.postMessage({
    type: 'buffers',
    data: buffers
  })
}

function clear() {
  recLength = 0
  recBuffersL = []
  recBuffersR = []
}

function mergeBuffers(recBuffers, recLength) {
  const result = new Float32Array(recLength)
  let offset = 0
  for (let i = 0; i < recBuffers.length; i++) {
    result.set(recBuffers[i], offset)
    offset += recBuffers[i].length
  }
  return result
}

function interleave(inputL, inputR) {
  let length = inputL.length + inputR.length
  let result = new Float32Array(length)

  let inputIndex = 0
  let index = 0

  while (index < length) {
    result[index++] = inputL[inputIndex]
    result[index++] = inputR[inputIndex]
    inputIndex++
  }
  return result
}

function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]))
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
  }
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

function encodeWAV(samples, mono) {
  const buffer = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(buffer)

  // RIFF identifier
  writeString(view, 0, 'RIFF')
  // file length
  view.setUint32(4, 32 + samples.length * 2, true)
  // RIFF type
  writeString(view, 8, 'WAVE')
  // format chunk identifier
  writeString(view, 12, 'fmt ')
  // format chunk length
  view.setUint32(16, 16, true)
  // sample format (raw)
  view.setUint16(20, 1, true)
  // channel count
  view.setUint16(22, mono ? 1 : 2, true)
  // sample rate
  view.setUint32(24, sampleRate, true)
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * 4, true)
  // block align (channel count * bytes per sample)
  view.setUint16(32, 4, true)
  // bits per sample
  view.setUint16(34, 16, true)
  // data chunk identifier
  writeString(view, 36, 'data')
  // data chunk length
  view.setUint32(40, samples.length * 2, true)

  floatTo16BitPCM(view, 44, samples)

  return view
}
