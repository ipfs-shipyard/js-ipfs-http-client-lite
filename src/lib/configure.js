'use strict'

const { Headers } = require('node-fetch')
const pkg = require('../../package.json')

// Set default configuration and call create function with them
module.exports = create => config => {
  config = config || {}
  if (typeof config === 'string') config = { apiUrl: config }

  config.fetch = config.fetch || require('./fetch').fetch
  config.apiUrl = config.apiUrl || 'http://localhost:5001'
  config.apiPath = config.apiPath || '/api/v0'
  config.headers = new Headers(config.headers)

  if (!config.headers.has('User-Agent')) {
    config.headers.append('User-Agent', `${pkg.name}/${pkg.version}`)
  }

  return create(config)
}
