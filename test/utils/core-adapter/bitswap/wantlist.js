'use strict'

const callbackify = require('../../../../src/lib/callbackify')

module.exports = ipfsLite => callbackify(async (...args) => {
  const list = await ipfsLite.bitswap.wantlist(...args)
  return { Keys: list.map(cid => ({ '/': cid })) }
})
