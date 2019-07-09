'use strict'

const Multiaddr = require('multiaddr')
const PeerId = require('peer-id')

module.exports = ipfsLite => async (...args) => {
  const list = await ipfsLite.swarm.peers(...args)
  return list.map(parsePeer)
}

function parsePeer (peer) {
  const res = {}
  try {
    res.addr = Multiaddr(peer.addr)
    res.peer = PeerId.createFromB58String(peer.peer)
    res.muxer = peer.muxer
  } catch (error) {
    res.error = error
    res.rawPeerInfo = peer
  }
  if (peer.latency) {
    res.latency = peer.latency
  }
  if (peer.streams) {
    res.streams = peer.streams
  }
  return res
}
