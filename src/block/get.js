'use strict'

const QueryString = require('querystring')
const { Buffer } = require('buffer')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, signal, headers }) => {
  return async (cid, options) => {
    options = options || {}

    const qs = { arg: cid }
    const url = `${apiUrl}${apiPath}/block/get?${QueryString.stringify(qs)}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    return Buffer.from(await res.blob())
  }
})
