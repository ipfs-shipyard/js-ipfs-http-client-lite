'use strict'

const ndjson = require('iterable-ndjson')
const QueryString = require('querystring')
const configure = require('./lib/configure')
const { ok, toIterable } = require('./lib/fetch')
const toCamel = require('./lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return (peerId, options) => (async function * () {
    options = options || {}

    const qs = { arg: peerId }

    if (options.count != null) {
      qs.count = options.count
    }

    const url = `${apiUrl}${apiPath}/ping?${QueryString.stringify(qs)}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))

    for await (const pong of ndjson(toIterable(res.body))) {
      yield toCamel(pong)
    }
  })()
})
