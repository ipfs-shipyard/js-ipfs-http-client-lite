'use strict'

const QueryString = require('querystring')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, signal, headers }) => {
  return async options => {
    options = options || {}

    const qs = {}

    if (options.verbose) {
      qs.verbose = true
    } else {
      if (options.streams) {
        qs.streams = true
      }
      if (options.latency) {
        qs.latency = true
      }
    }

    const url = `${apiUrl}${apiPath}/swarm/peers?${QueryString.stringify(qs)}`
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
