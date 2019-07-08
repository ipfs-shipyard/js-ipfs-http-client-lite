'use strict'

const { objectToQuery } = require('../lib/querystring')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async options => {
    options = options || {}

    const qs = objectToQuery({
      verbose: options.verbose,
      streams: options.streams,
      latency: options.latency
    })

    const url = `${apiUrl}${apiPath}/swarm/peers${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()

    return (data.Peers || []).map(p => {
      const peerInfo = {
        addr: p.Addr,
        peer: p.Peer
      }

      if (options.verbose || options.streams) {
        peerInfo.streams = (p.Streams || []).map(s => ({ protocol: s.Protocol }))
      }

      if (options.verbose || options.latency) {
        peerInfo.latency = p.Latency
      }

      if (options.verbose) {
        peerInfo.muxer = p.Muxer
      }

      return peerInfo
    })
  }
})
