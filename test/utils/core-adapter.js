'use strict'

const pull = require('pull-stream')
const Big = require('bignumber.js')
const callbackify = require('../../src/lib/callbackify')

module.exports = ipfs => {
  return new Proxy(ipfs, {
    get (_, prop) {
      switch (prop) {
        case 'add':
          return callbackify(async (...args) => {
            const res = await ipfs.add(...args)
            return res.map(({ name, hash, size }) => ({
              path: name,
              hash,
              size: parseInt(size)
            }))
          }, { minArgs: 1 })
        case 'addPullStream':
          return (...args) => pull(
            ipfs.addPullStream(...args),
            pull.map(({ name, hash, size }) => ({
              path: name,
              hash,
              size: parseInt(size)
            }))
          )
        case 'addFromURL':
          return callbackify(async (...args) => {
            const res = await ipfs.addFromURL(...args)
            return res.map(({ name, hash, size }) => ({
              path: name,
              hash,
              size: parseInt(size)
            }))
          }, { minArgs: 1 })
        case 'bitswap':
          return {
            stat: callbackify(async () => {
              const stats = await ipfs.bitswap.stat()
              stats.blocksReceived = new Big(stats.blocksReceived)
              stats.dataReceived = new Big(stats.DataReceived)
              stats.blocksSent = new Big(stats.BlocksSent)
              stats.dataSent = new Big(stats.DataSent)
              stats.dupBlksReceived = new Big(stats.DupBlksReceived)
              stats.dupDataReceived = new Big(stats.DupDataReceived)
              return stats
            }),
            wantlist: callbackify(async (...args) => {
              const list = await ipfs.bitswap.wantlist(...args)
              return { Keys: list.map(cid => ({ '/': cid })) }
            })
          }
        case 'ls':
          return callbackify(async (...args) => {
            const res = await ipfs.ls(...args)
            return res.map(({ name, hash, size, type }) => ({
              depth: 1,
              name,
              path: `${args[0]}/${name}`,
              hash,
              size,
              type: linkTypeToString(type)
            }))
          })
        case 'lsPullStream':
          return (...args) => pull(
            ipfs.lsPullStream(...args),
            pull.map(({ name, hash, size, type }) => ({
              depth: 1,
              name,
              path: `${args[0]}/${name}`,
              hash,
              size,
              type: linkTypeToString(type)
            }))
          )
        default: return ipfs[prop]
      }
    }
  })
}

function linkTypeToString (type) {
  switch (type) {
    case 1:
    case 5:
      return 'dir'
    case 2:
      return 'file'
    default:
      return 'unknown'
  }
}
