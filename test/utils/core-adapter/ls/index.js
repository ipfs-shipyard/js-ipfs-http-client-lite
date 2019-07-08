'use strict'

const linkTypeToString = require('./link-type-to-string')

module.exports = ipfsLite => async (...args) => {
  const res = await ipfsLite.ls(...args)
  return res.map(({ name, hash, size, type }) => ({
    depth: 1,
    name,
    path: `${args[0]}/${name}`,
    hash,
    size,
    type: linkTypeToString(type)
  }))
}
