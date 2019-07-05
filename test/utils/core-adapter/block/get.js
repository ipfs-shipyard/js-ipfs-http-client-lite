'use strict'

const CID = require('cids')
const Block = require('ipfs-block')
const callbackify = require('../../../../src/lib/callbackify')

module.exports = ipfsLite => callbackify(async (cid, options) => {
  const data = await ipfsLite.block.get(cid, options)
  return new Block(data, new CID(cid))
})
