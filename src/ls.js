'use strict'

const QueryString = require('querystring')
const configure = require('./lib/configure')
const { ok } = require('./lib/fetch')
const toCamel = require('./lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, signal, headers }) => {
  return (path, options) => (async function * () {
    options = options || {}

    const qs = { arg: path.toString() }

    const url = `${apiUrl}${apiPath}/ls?${QueryString.stringify(qs)}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()

    const list = ((data.Objects || [])[0] || {}).Links || []

    for (const link of list) {
      yield toCamel(link)
    }
  })()
})
