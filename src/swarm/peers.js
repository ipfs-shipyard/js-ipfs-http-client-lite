'use strict'

const { objectToQuery } = require('../lib/querystring')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')
const toCamel = require('../lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async options => {
    options = options || {}

    const qs = objectToQuery({
      verbose: options.verbose,
      streams: options.streams,
      latency: options.latency,
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/swarm/peers${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()

    return (data.Peers || []).map(p => {
      const peerInfo = toCamel(p)

      if (peerInfo.streams) {
        peerInfo.streams = peerInfo.streams.map(toCamel)
      }

      return peerInfo
    })
  }
})
