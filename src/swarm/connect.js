'use strict'

const QueryString = require('querystring')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (addrs, options) => {
    addrs = Array.isArray(addrs) ? addrs : [addrs]
    options = options || {}

    const qs = { arg: addrs.map(a => a.toString()) }

    const url = `${apiUrl}${apiPath}/swarm/connect?${QueryString.stringify(qs)}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()

    return ((data || {}).Strings || [])
  }
})
