'use strict'

const ndjson = require('iterable-ndjson')
const { objectToQuery } = require('../lib/querystring')
const configure = require('../lib/configure')
const { ok, toIterable } = require('../lib/fetch')
const { toFormData } = require('./form-data')
const toCamel = require('../lib/to-camel')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return (input, options) => (async function * () {
    options = options || {}

    const qs = objectToQuery({
      'stream-channels': true,
      chunker: options.chunker,
      'cid-version': options.cidVersion,
      'cid-base': options.cidBase,
      'enable-sharding-experiment': options.enableShardingExperiment,
      hash: options.hashAlg,
      'only-hash': options.onlyHash,
      pin: options.pin,
      progress: options.progress ? true : null,
      quiet: options.quiet,
      quieter: options.quieter,
      'raw-leaves': options.rawLeaves,
      'shard-split-threshold': options.shardSplitThreshold,
      silent: options.silent,
      trickle: options.trickle,
      'wrap-with-directory': options.wrapWithDirectory,
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/add${qs}`
    const res = await ok(fetch(url, {
      method: 'POST',
      signal: options.signal,
      headers: options.headers || headers,
      body: await toFormData(input)
    }))

    for await (let file of ndjson(toIterable(res.body))) {
      file = toCamel(file)
      // console.log(file)
      if (options.progress && file.bytes) {
        options.progress(file.bytes)
      } else {
        yield toCamel(file)
      }
    }
  })()
})
