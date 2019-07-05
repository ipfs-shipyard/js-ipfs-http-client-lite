'use strict'

const pull = require('pull-stream/pull')
const map = require('pull-stream/throughs/map')
const linkTypeToString = require('./ls/link-type-to-string')

module.exports = ipfsLite => (...args) => pull(
  ipfsLite.lsPullStream(...args),
  map(({ name, hash, size, type }) => ({
    depth: 1,
    name,
    path: `${args[0]}/${name}`,
    hash,
    size,
    type: linkTypeToString(type)
  }))
)
