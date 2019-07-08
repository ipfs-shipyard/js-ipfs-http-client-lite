'use strict'
/* eslint-env browser */

// Set default configuration and call create function with them
module.exports = create => config => {
  config = config || {}
  if (typeof config === 'string') config = { apiUrl: config }

  config.fetch = config.fetch || require('./fetch').fetch
  config.apiUrl = config.apiUrl || getDefaultApiUrl()
  config.apiPath = config.apiPath || '/api/v0'
  config.headers = new Headers(config.headers)

  return create(config)
}

function getDefaultApiUrl () {
  const proto = location.protocol.startsWith('http')
    ? location.protocol.split(':')[0]
    : 'http'
  const host = location.hostname
  const port = location.port || (proto.startsWith('https') ? 443 : 80)
  return `${proto}://${host}:${port}`
}
