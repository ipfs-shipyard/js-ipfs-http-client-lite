'use strict'

module.exports = ipfsLite => async (...args) => {
  const res = await ipfsLite.add(...args)
  return res.map(({ name, hash, size }) => ({
    path: name,
    hash,
    size: parseInt(size)
  }))
}
