'use strict'

module.exports = function linkTypeToString (type) {
  switch (type) {
    case 1:
    case 5:
      return 'dir'
    case 2:
      return 'file'
    default:
      return 'unknown'
  }
}
