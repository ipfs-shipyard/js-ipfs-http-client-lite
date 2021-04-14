'use strict'

const configure = require('./lib/configure')
const { ok } = require('./lib/fetch')
const { objectToQuery } = require('./lib/querystring')
const toCamel = require('./lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (cid, options) => {
    options = options || {}

    const qs = objectToQuery({
      arg: cid.toString(),
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/resolve${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()
    return toCamel(data)
  }
})
