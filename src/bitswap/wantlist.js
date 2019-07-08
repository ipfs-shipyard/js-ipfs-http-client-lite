'use strict'

const { objectToQuery } = require('../lib/querystring')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (peerId, options) => {
    if (!options && typeof peerId === 'object') {
      options = peerId
      peerId = null
    }

    options = options || {}

    const url = `${apiUrl}${apiPath}/bitswap/wantlist${objectToQuery({ peer: peerId })}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()
    return (data.Keys || []).map(item => item['/'])
  }
})
