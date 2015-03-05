var httpify = require('httpify')
var jsend = require('jsend')

function req (url, body, plural, timeout, callback) {
  httpify({
    method: 'POST',
    url: url,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    timeout: timeout
  }, function (err, res) {
    if (err) return callback(err)
    if (res.statusCode !== 200) return callback(new Error('Error ' + res.statusCode))

    var body = res.body
    if (!jsend.isValid(body)) return callback(new Error('Invalid JSend response'))
    if (body.status === 'fail' || body.status === 'error') {
      return callback(new Error(body.message || body.data))
    }

    return callback(undefined, plural ? body.data : body.data[0])
  })
}

function Node (base) {
  var self = this

  this.addresses = {
    summary: function (addresses, callback) {
      req(base + '/addresses/summary', { addresses: [].concat(addresses) }, Array.isArray(addresses), self.timeout, callback)
    },

    transactions: function (addresses, blockHeight, callback) {
      // optional blockHeight
      if ('function' === typeof blockHeight) {
        callback = blockHeight
        blockHeight = 0
      }

      req(base + '/addresses/transactions', { addresses: [].concat(addresses), blockHeight: blockHeight, }, true, self.timeout, callback)
    },

    unspents: function (addresses, callback) {
      req(base + '/addresses/unspents', { addresses: [].concat(addresses) }, true, self.timeout, callback)
    }
  }

  this.blocks = {
    get: function (blockIds, callback) {
      req(base + '/blocks/get', { blockIds: [].concat(blockIds) }, Array.isArray(blockIds), self.timeout, callback)
    },

    latest: function (callback) {
      req(base + '/blocks/latest', {}, true, self.timeout, callback)
    },

    propagate: function (blockIds, callback) {
      req(base + '/blocks/propagate', { blockIds: [].concat(blockIds) }, Array.isArray(blockIds), self.timeout, callback)
    },

    summary: function (blockIds, callback) {
      req(base + '/blocks/summary', { blockIds: [].concat(blockIds) }, Array.isArray(blockIds), self.timeout, callback)
    }
  }

  this.timeout = 10000
  this.transactions = {
    get: function (txIds, callback) {
      req(base + '/transactions/get', { txIds: [].concat(txIds) }, Array.isArray(txIds), self.timeout, callback)
    },

    latest: function (callback) {
      req(base + '/transactions/latest', {}, true, self.timeout, callback)
    },

    propagate: function (txHexs, callback) {
      req(base + '/transactions/propagate', { txHexs: [].concat(txHexs) }, Array.isArray(txHexs), self.timeout, callback)
    },

    summary: function (txIds, callback) {
      req(base + '/transactions/summary', { txIds: [].concat(txIds) }, Array.isArray(txIds), self.timeout, callback)
    }
  }
}

module.exports = Node
