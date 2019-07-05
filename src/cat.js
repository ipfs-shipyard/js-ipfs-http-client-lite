'use strict'

const { Buffer } = require('buffer')
const configure = require('./lib/configure')
const { ok, toIterable } = require('./lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return (cid, options) => (async function * () {
    options = options || {}

    const url = `${apiUrl}${apiPath}/cat?arg=${encodeURIComponent(cid)}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))

    for await (const chunk of toIterable(res.body)) {
      yield Buffer.from(chunk)
    }
  })()
})
