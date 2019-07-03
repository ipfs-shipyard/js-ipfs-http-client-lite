'use strict'

const QueryString = require('querystring')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')

module.exports = configure(({ fetch, apiUrl, apiPath, signal, headers }) => {
  return async (peerId, options) => {
    if (!options && typeof peerId === 'object') {
      options = peerId
      peerId = null
    }

    options = options || {}

    const qs = {}

    if (peerId) {
      qs.peer = peerId
    }

    const url = `${apiUrl}${apiPath}/bitswap/wantlist?${QueryString.stringify(qs)}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    const data = await res.json()
    return (data.Keys || []).map(item => item['/'])
  }
})
