'use strict'

const { objectToQuery } = require('../lib/querystring')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (addrs, options) => {
    addrs = Array.isArray(addrs) ? addrs : [addrs]
    options = options || {}

    const qs = objectToQuery({
      arg: addrs.map(a => a.toString()),
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/swarm/connect${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()

    return ((data || {}).Strings || [])
  }
})
