'use strict'

const CID = require('cids')
const Block = require('ipfs-block')

module.exports = ipfsLite => async (cid, options) => {
  const data = await ipfsLite.block.get(cid, options)
  return new Block(data, new CID(cid))
}
