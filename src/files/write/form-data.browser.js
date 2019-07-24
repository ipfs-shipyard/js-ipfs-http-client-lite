'use strict'
/* eslint-env browser */

const toAsyncIterable = require('../../lib/file-data-to-async-iterable')

exports.toFormData = async (path, input) => {
  input = toAsyncIterable(input)
  const formData = new FormData()

  // In the browser there's _currently_ no streaming upload, buffer up our
  // async iterator chunks and append a big Blob :(
  // One day, this will be browser streams
  const bufs = []
  for await (const chunk of input) {
    bufs.push(Buffer.isBuffer(chunk) ? chunk.buffer : chunk)
  }

  formData.append('file', new Blob(bufs, { type: 'application/octet-stream' }))

  return formData
}
