'use strict'

const callbackify = require('../../../../src/lib/callbackify')
const linkTypeToString = require('./link-type-to-string')

module.exports = ipfsLite => callbackify(async (...args) => {
  const res = await ipfsLite.ls(...args)
  return res.map(({ name, hash, size, type }) => ({
    depth: 1,
    name,
    path: `${args[0]}/${name}`,
    hash,
    size,
    type: linkTypeToString(type)
  }))
})
