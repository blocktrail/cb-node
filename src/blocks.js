var utils = require('./utils')

function Blocks(url) {
  this.url = url
}

Blocks.prototype.get = function(blockIds, callback) {
  utils.jsendBatchedRequest(this.url + '/get', {
    blockIds: [].concat(blockIds)
  }, Array.isArray(blockIds), callback)
}

Blocks.prototype.latest = function(callback) {
  utils.jsendBatchedRequest(this.url + '/latest', {}, true, callback)
}

Blocks.prototype.propagate = function(blockIds, callback) {
  utils.jsendBatchedRequest(this.url + '/propagate', {
    blockIds: [].concat(blockIds)
  }, Array.isArray(blockIds), callback)
}

Blocks.prototype.summary = function(blockIds, callback) {
  utils.jsendBatchedRequest(this.url + '/summary', {
    blockIds: [].concat(blockIds)
  }, Array.isArray(blockIds), callback)
}

module.exports = Blocks
