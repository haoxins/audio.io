
function readBlobAsArrayBuffer(blob) {
  const reader = new FileReader()
  reader.readAsArrayBuffer(blob)
  return fileReaderReady(reader)
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

export {
  readBlobAsArrayBuffer
}
