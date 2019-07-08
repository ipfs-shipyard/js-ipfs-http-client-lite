'use strict'

const Big = require('bignumber.js')

module.exports = ipfsLite => async () => {
  const stats = await ipfsLite.bitswap.stat()
  stats.blocksReceived = new Big(stats.blocksReceived)
  stats.dataReceived = new Big(stats.DataReceived)
  stats.blocksSent = new Big(stats.BlocksSent)
  stats.dataSent = new Big(stats.DataSent)
  stats.dupBlksReceived = new Big(stats.DupBlksReceived)
  stats.dupDataReceived = new Big(stats.DupDataReceived)
  return stats
}
