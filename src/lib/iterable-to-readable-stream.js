'use strict'

const { Readable } = require('stream')

module.exports = function toStream (iterable) {
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
