'use strict'

module.exports = ipfsLite => async (...args) => {
  const res = await ipfsLite.addFromURL(...args)
  return res.map(({ name, hash, size }) => ({
    path: name,
    hash,
    size: parseInt(size)
  }))
}
