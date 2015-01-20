var utils = require('./utils')

function Addresses(url) {
  this.url = url
}

Addresses.prototype.summary = function(addresses, callback) {
  utils.jsendBatchedRequest(this.url + '/summary', {
    addresses: [].concat(addresses)
  }, Array.isArray(addresses), callback)
}

Addresses.prototype.transactions = function(addresses, blockHeight, callback) {
  // optional blockHeight
  if ('function' === typeof blockHeight) {
    callback = blockHeight
    blockHeight = 0
  }

  utils.jsendBatchedRequest(this.url + '/transactions', {
    addresses: [].concat(addresses),
    blockHeight: blockHeight,
  }, true, callback)
}

Addresses.prototype.unspents = function(addresses, callback) {
  utils.jsendBatchedRequest(this.url + '/unspents', {
    addresses: [].concat(addresses)
  }, true, callback)
}

module.exports = Addresses
