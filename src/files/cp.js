'use strict'

const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')
const { objectToQuery } = require('../lib/querystring')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (...args) => {
    let options = {}

    if (typeof args[args.length - 1] === 'object') {
      options = args.pop()
    }

    const qs = objectToQuery({
      arg: args,
      flush: options.flush,
      format: options.format,
      hash: options.hashAlg,
      parents: options.parents,
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/files/cp${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))

    return res.text()
  }
})
