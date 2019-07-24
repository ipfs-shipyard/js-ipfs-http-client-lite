'use strict'

const configure = require('../lib/configure')
const { objectToQuery } = require('../lib/querystring')
const { ok } = require('../lib/fetch')
const toCamel = require('../lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (cid, options) => {
    options = options || {}

    const qs = objectToQuery({
      arg: cid.toString(),
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/block/stat${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    return toCamel(await res.json())
  }
})
