'use strict'

const CID = require('cids')
const HandlerMap = require('./handler-map')

module.exports = ipfsLite => (topic, handler, options) => {
  HandlerMap.set(handler, (msg, fatal) => {
    handler({ ...msg, from: new CID(msg.from).toString() }, fatal)
  })

  return ipfsLite.pubsub.subscribe(topic, HandlerMap.get(handler), options)
}
