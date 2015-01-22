var utils = require('./utils')

function Blocks(url, timeout) {
  this.url = url
  this.timeout = timeout
}

Blocks.prototype.get = function(blockIds, callback) {
  utils.jsendBatchedRequest(this.url + '/get', {
    blockIds: [].concat(blockIds)
  }, Array.isArray(blockIds), this.timeout, callback)
}

Blocks.prototype.latest = function(callback) {
  utils.jsendBatchedRequest(this.url + '/latest', {}, true, this.timeout, callback)
}

Blocks.prototype.propagate = function(blockIds, callback) {
  utils.jsendBatchedRequest(this.url + '/propagate', {
    blockIds: [].concat(blockIds)
  }, Array.isArray(blockIds), this.timeout, callback)
}

Blocks.prototype.summary = function(blockIds, callback) {
  utils.jsendBatchedRequest(this.url + '/summary', {
    blockIds: [].concat(blockIds)
  }, Array.isArray(blockIds), this.timeout, callback)
}

module.exports = Blocks
