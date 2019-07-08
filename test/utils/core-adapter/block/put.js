'use strict'

const CID = require('cids')
const Multihash = require('multihashes')
const Block = require('ipfs-block')

module.exports = ipfsLite => async (block, options) => {
  options = options || {}

  // Extract options from passed CID
  if (options.cid || block.cid) {
    const cid = new CID(block.cid || options.cid)
    const { name, length } = Multihash.decode(cid.multihash)
    options = { format: cid.codec, mhtype: name, mhlen: length, version: cid.version }
  }

  // Convert Block instance to buffer
  if (block.data) {
    block = block.data
  }

  const { key } = await ipfsLite.block.put(block, options)
  return new Block(block, new CID(key))
}
