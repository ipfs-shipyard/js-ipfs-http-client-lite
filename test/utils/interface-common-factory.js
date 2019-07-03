'use strict'
/* eslint-env mocha */

const each = require('async/each')
const IPFSFactory = require('ipfsd-ctl')
const toUri = require('multiaddr-to-uri')
const ipfsClient = require('../../src')
const CoreAdapter = require('./core-adapter')

function createFactory (options) {
  options = options || {}

  options.factoryOptions = options.factoryOptions || {}
  options.spawnOptions = options.spawnOptions || { initOptions: { bits: 1024, profile: 'test' } }

  const ipfsFactory = IPFSFactory.create(options.factoryOptions)

  return function createCommon () {
    const nodes = []
    let setup, teardown

    if (options.createSetup) {
      setup = options.createSetup({ ipfsFactory, nodes }, options)
    } else {
      setup = (callback) => {
        callback(null, {
          spawnNode (cb) {
            ipfsFactory.spawn(options.spawnOptions, (err, _ipfsd) => {
              if (err) {
                return cb(err)
              }

              nodes.push(_ipfsd)

              let apiAddr = _ipfsd.apiAddr.toString()
              if (!/\/https?$/.test(apiAddr)) apiAddr = apiAddr + '/http'
              cb(null, CoreAdapter(ipfsClient(toUri(apiAddr))))
            })
          }
        })
      }
    }

    if (options.createTeardown) {
      teardown = options.createTeardown({ ipfsFactory, nodes }, options)
    } else {
      teardown = callback => each(nodes, (node, cb) => node.stop(cb), callback)
    }

    return { setup, teardown }
  }
}

exports.create = createFactory
