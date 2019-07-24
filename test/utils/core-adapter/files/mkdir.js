'use strict'

module.exports = ipfsLite => (path, options) => {
  options = options || {}

  if (options.p != null) {
    options.parents = options.p
    delete options.p
  }

  return ipfsLite.files.mkdir(path, options)
}
