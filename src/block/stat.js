'use strict'

const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')
const toCamel = require('../lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (cid, options) => {
    options = options || {}

    const url = `${apiUrl}${apiPath}/block/stat?arg=${encodeURIComponent(cid)}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    return toCamel(await res.json())
  }
})
