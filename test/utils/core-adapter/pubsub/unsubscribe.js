'use strict'

const HandlerMap = require('./handler-map')

module.exports = ipfsLite => async (topic, handler) => {
  const adapterHandler = HandlerMap.get(handler)
  HandlerMap.delete(handler)
  await ipfsLite.pubsub.unsubscribe(topic, adapterHandler)
  await new Promise(resolve => setTimeout(resolve, 100))
}
