var utils = require('./utils')

function Transactions(url, timeout) {
  this.url = url
  this.timeout = timeout
}

Transactions.prototype.get = function(txIds, callback) {
  utils.jsendBatchedRequest(this.url + '/get', {
    txIds: [].concat(txIds)
  }, Array.isArray(txIds), this.timeout, callback)
}

Transactions.prototype.latest = function(callback) {
  utils.jsendBatchedRequest(this.url + '/latest', {}, true, this.timeout, callback)
}

Transactions.prototype.propagate = function(txHexs, callback) {
  utils.jsendBatchedRequest(this.url + '/propagate', {
    txHexs: [].concat(txHexs)
  }, Array.isArray(txHexs), this.timeout, callback)
}

Transactions.prototype.summary = function(txIds, callback) {
  utils.jsendBatchedRequest(this.url + '/summary', {
    txIds: [].concat(txIds)
  }, Array.isArray(txIds), this.timeout, callback)
}

module.exports = Transactions
