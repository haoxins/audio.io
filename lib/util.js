
export const readBlobAsArrayBuffer = (blob) => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(blob)
  return fileReaderReady(reader)
}

export const getUserAudioStream = () => {
  return new Promise((resolve, reject) => {
    navigator.webkitGetUserMedia({audio: true}, (stream) => {
      resolve(stream)
    }, (error) => {
      reject(error)
    })
  })
}

export const getDownloadLink = (blob, filename) => {
  const u = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = filename
  a.text = filename
  a.href = u
  return a
}

/**
 * private
 */

function fileReaderReady(reader) {
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
  })
}
