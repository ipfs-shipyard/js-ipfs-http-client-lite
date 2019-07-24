'use strict'

const { objectToQuery } = require('../../lib/querystring')
const configure = require('../../lib/configure')
const { ok } = require('../../lib/fetch')
const { toFormData } = require('./form-data')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (path, input, options) => {
    options = options || {}

    const qs = objectToQuery({
      arg: path,
      'stream-channels': true,
      'cid-version': options.cidVersion,
      count: options.count,
      create: options.create,
      hash: options.hashAlg,
      offset: options.offset,
      parents: options.parents,
      'raw-leaves': options.rawLeaves,
      truncate: options.truncate,
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/files/write${qs}`
    const res = await ok(fetch(url, {
      method: 'POST',
      signal: options.signal,
      headers: options.headers || headers,
      body: await toFormData(path, input)
    }))

    return res.text()
  }
})
