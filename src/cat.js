'use strict'

const { Buffer } = require('buffer')
const configure = require('./lib/configure')
const { ok, toIterable } = require('./lib/fetch')
const { objectToQuery } = require('./lib/querystring')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return (cid, options) => (async function * () {
    options = options || {}

    const qs = objectToQuery({
      arg: cid.toString(),
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/cat${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))

    for await (const chunk of toIterable(res.body)) {
      yield Buffer.from(chunk)
    }
  })()
})
