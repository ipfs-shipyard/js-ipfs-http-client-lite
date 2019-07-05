'use strict'

const { Buffer } = require('buffer')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (cid, options) => {
    options = options || {}

    const url = `${apiUrl}${apiPath}/block/get?arg=${encodeURIComponent(cid)}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    return Buffer.from(await res.arrayBuffer())
  }
})
