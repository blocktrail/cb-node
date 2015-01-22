var utils = require('./utils')

function Addresses(url, timeout) {
  this.url = url
  this.timeout = timeout
}

Addresses.prototype.summary = function(addresses, callback) {
  utils.jsendBatchedRequest(this.url + '/summary', {
    addresses: [].concat(addresses)
  }, Array.isArray(addresses), this.timeout, callback)
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
  }, true, this.timeout, callback)
}

Addresses.prototype.unspents = function(addresses, callback) {
  utils.jsendBatchedRequest(this.url + '/unspents', {
    addresses: [].concat(addresses)
  }, true, this.timeout, callback)
}

module.exports = Addresses
