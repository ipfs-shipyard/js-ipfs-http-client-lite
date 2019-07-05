'use strict'

const pull = require('pull-stream/pull')
const map = require('pull-stream/throughs/map')

module.exports = ipfsLite => (...args) => pull(
  ipfsLite.addPullStream(...args),
  map(({ name, hash, size }) => ({
    path: name,
    hash,
    size: parseInt(size)
  }))
)
