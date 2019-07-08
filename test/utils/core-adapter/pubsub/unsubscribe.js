'use strict'

const HandlerMap = require('./handler-map')

module.exports = ipfsLite => (topic, handler) => {
  const adapterHandler = HandlerMap.get(handler)
  HandlerMap.delete(handler)
  return ipfsLite.pubsub.unsubscribe(topic, adapterHandler)
}
