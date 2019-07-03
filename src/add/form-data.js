'use strict'

// const toStream = require('async-iterator-to-stream')
const FormData = require('form-data')
const { Readable } = require('stream')
const normaliseInput = require('./normalise-input')

exports.toFormData = async function toFormData (input) {
  // In Node.js, FormData can be passed a stream so no need to buffer
  const files = normaliseInput(input)
  const formData = new FormData()
  let i = 0

  for await (const file of files) {
    if (file.content) {
      formData.append(
        `file-${i}`,
        // FIXME: add a `path` property to the stream so `form-data` doesn't set
        // a Content-Length header that is only the sum of the size of the
        // header/footer when knownLength option (below) is null.
        Object.assign(
          toStream(file.content),
          { path: file.path || `file-${i}` }
        ),
        {
          filepath: file.path,
          contentType: 'application/octet-stream',
          knownLength: file.content.length // Send Content-Length header if known
        }
      )
    } else {
      formData.append(`dir-${i}`, Buffer.alloc(0), {
        filepath: file.path,
        contentType: 'application/x-directory'
      })
    }

    i++
  }

  return formData
}

function toStream (iterable) {
  let reading = false
  return new Readable({
    async read (size) {
      if (reading) return
      reading = true

      try {
        while (true) {
          const { value, done } = await iterable.next(size)
          if (done) return this.push(null)
          if (!this.push(value)) break
        }
      } catch (err) {
        this.emit('error', err)
        if (iterable.return) iterable.return()
      } finally {
        reading = false
      }
    }
  })
}
