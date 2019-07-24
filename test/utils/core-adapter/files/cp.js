'use strict'

const toSources = require('./args-to-srcs')

module.exports = ipfsLite => (...args) => {
  const { sources, options } = toSources(args)
  return ipfsLite.files.cp(...sources, options)
}
