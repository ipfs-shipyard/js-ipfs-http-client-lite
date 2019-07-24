'use strict'

const { objectToQuery } = require('./lib/querystring')
const configure = require('./lib/configure')
const { ok } = require('./lib/fetch')
const toCamel = require('./lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return (path, options) => (async function * () {
    options = options || {}

    const qs = objectToQuery({
      arg: path.toString(),
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/ls${qs}`
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
