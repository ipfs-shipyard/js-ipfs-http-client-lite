'use strict'

const ndjson = require('iterable-ndjson')
const { objectToQuery } = require('./lib/querystring')
const configure = require('./lib/configure')
const { ok, toIterable } = require('./lib/fetch')
const toCamel = require('./lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return (peerId, options) => (async function * () {
    options = options || {}

    const qs = objectToQuery({
      arg: peerId,
      count: options.count,
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/ping${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))

    for await (const pong of ndjson(toIterable(res.body))) {
      yield toCamel(pong)
    }
  })()
})
