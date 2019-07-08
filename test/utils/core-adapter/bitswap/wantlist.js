'use strict'

module.exports = ipfsLite => async (...args) => {
  const list = await ipfsLite.bitswap.wantlist(...args)
  return { Keys: list.map(cid => ({ '/': cid })) }
}
