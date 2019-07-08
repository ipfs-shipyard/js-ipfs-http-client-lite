'use strict'

const { objectToQuery } = require('../lib/querystring')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (topic, options) => {
    if (!options && typeof topic === 'object') {
      options = topic
      topic = null
    }

    options = options || {}

    const url = `${apiUrl}${apiPath}/pubsub/peers${objectToQuery({ arg: topic })}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()
    return data.Strings || []
  }
})
