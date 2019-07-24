'use strict'

const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')
const { objectToQuery } = require('../lib/querystring')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (path, options) => {
    options = options || {}

    const qs = objectToQuery({
      arg: path,
      'cid-version': options.cidVersion,
      flush: options.flush,
      format: options.format,
      hash: options.hashAlg,
      parents: options.parents,
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/files/mkdir${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))

    return res.text()
  }
})
