'use strict'

const FormData = require('form-data')
const toAsyncIterable = require('../../lib/file-data-to-async-iterable')
const toStream = require('../../lib/iterable-to-readable-stream')

exports.toFormData = (path, input) => {
  input = toAsyncIterable(input)
  const formData = new FormData()

  formData.append(
    'file',
    // FIXME: add a `path` property to the stream so `form-data` doesn't set
    // a Content-Length header that is only the sum of the size of the
    // header/footer when knownLength option (below) is null.
    Object.assign(toStream(input), { path }),
    {
      contentType: 'application/octet-stream',
      knownLength: input.length // Send Content-Length header if known
    }
  )

  return formData
}
