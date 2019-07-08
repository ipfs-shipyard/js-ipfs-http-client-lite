'use strict'

const callbackify = require('../../../src/lib/callbackify')

// TODO: extract as separate module
module.exports = ipfsLite => {
  const adapter = {
    add: callbackify(require('./add')(ipfsLite), { minArgs: 1 }),
    addPullStream: require('./add-pull-stream')(ipfsLite),
    addFromURL: callbackify(require('./add-from-url')(ipfsLite), { minArgs: 1 }),
    bitswap: {
      stat: callbackify(require('./bitswap/stat')(ipfsLite)),
      wantlist: callbackify(require('./bitswap/wantlist')(ipfsLite))
    },
    block: {
      get: callbackify(require('./block/get')(ipfsLite)),
      put: callbackify(require('./block/put')(ipfsLite)),
      stat: ipfsLite.block.stat
    },
    ls: callbackify(require('./ls')(ipfsLite)),
    lsPullStream: require('./ls-pull-stream')(ipfsLite),
    pubsub: {
      ls: ipfsLite.pubsub.ls,
      peers: ipfsLite.pubsub.peers,
      publish: ipfsLite.pubsub.publish,
      subscribe: callbackify(require('./pubsub/subscribe')(ipfsLite), { minArgs: 2 }),
      unsubscribe: callbackify(require('./pubsub/unsubscribe')(ipfsLite), { minArgs: 2 })
    }
  }

  return new Proxy(ipfsLite, {
    get (_, prop) {
      return adapter[prop] || ipfsLite[prop]
    }
  })
}
