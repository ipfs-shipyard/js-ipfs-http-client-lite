'use strict'

const QueryString = require('querystring')
const FormData = require('form-data')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')
const toCamel = require('../lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  const put = async (data, options) => {
    options = options || {}

    const qs = Object.entries({
      format: options.format,
      mhtype: options.mhtype,
      mhlen: options.mhlen,
      pin: options.pin
    }).reduce((obj, [key, value]) => {
      if (value != null) obj[key] = value
      return obj
    }, {})

    const url = `${apiUrl}${apiPath}/block/put?${QueryString.stringify(qs)}`

    const body = new FormData()
    body.append('file', data)

    let res

    try {
      res = await ok(fetch(url, {
        method: 'POST',
        signal: options.signal,
        headers: options.headers || headers,
        body
      }))
    } catch (err) {
      // Retry with "protobuf"/"cbor" format for go-ipfs
      // TODO: remove when https://github.com/ipfs/go-cid/issues/75 resolved
      if (options.format === 'dag-pb') {
        return put(data, { ...options, format: 'protobuf' })
      } else if (options.format === 'dag-cbor') {
        return put(data, { ...options, format: 'cbor' })
      }

      throw err
    }

    return toCamel(await res.json())
  }

  return put
})
