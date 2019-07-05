'use strict'

const callbackify = require('../../../src/lib/callbackify')

module.exports = ipfsLite => callbackify(async (...args) => {
  const res = await ipfsLite.add(...args)
  return res.map(({ name, hash, size }) => ({
    path: name,
    hash,
    size: parseInt(size)
  }))
}, { minArgs: 1 })
