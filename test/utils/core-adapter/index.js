'use strict'

// TODO: extract as separate module
module.exports = ipfsLite => {
  const adapter = {
    add: require('./add')(ipfsLite),
    addPullStream: require('./add-pull-stream')(ipfsLite),
    addFromURL: require('./add-from-url')(ipfsLite),
    bitswap: {
      stat: require('./bitswap/stat')(ipfsLite),
      wantlist: require('./bitswap/wantlist')(ipfsLite)
    },
    block: {
      get: require('./block/get')(ipfsLite),
      put: require('./block/put')(ipfsLite),
      stat: ipfsLite.block.stat
    },
    ls: require('./ls')(ipfsLite),
    lsPullStream: require('./ls-pull-stream')(ipfsLite)
  }

  return new Proxy(ipfsLite, {
    get (_, prop) {
      return adapter[prop] || ipfsLite[prop]
    }
  })
}
