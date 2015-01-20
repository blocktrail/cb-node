var utils = require('./utils')

function Addresses(url) {
  this.url = url
}

Addresses.prototype.summary = function(addresses, callback) {
  utils.jsendBatchedRequest(this.url + '/summary', {
    addresses: addresses
  }, Array.isArray(addresses), callback)
}

Addresses.prototype.transactions = function(addresses, blockHeight, callback) {
  // optional blockHeight
  if ('function' === typeof blockHeight) {
    callback = blockHeight
    blockHeight = 0
  }

  utils.jsendBatchedRequest(this.url + '/transactions', {
    addresses: addresses,
    blockHeight: blockHeight,
  }, Array.isArray(addresses), callback)
}

Addresses.prototype.unspents = function(addresses, callback) {
  utils.jsendBatchedRequest(this.url + '/unspents', {
    addresses: addresses
  }, Array.isArray(addresses), callback)
}

module.exports = Addresses
