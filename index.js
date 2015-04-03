var httpify = require('httpify')
var jsend = require('jsend')
var qs = require('querystring')

function req (url, body, xhrOptions, callback, deconstruct) {
  var options = {
    method: 'POST',
    url: url,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }

  // extend the options object if necessary
  for (var option in xhrOptions) {
    options[option] = xhrOptions[option]
  }

  httpify(options, function (err, res) {
    if (err) return callback(err)
    if (res.statusCode !== 200) return callback(new Error('Error ' + res.statusCode))

    var body = res.body
    if (!jsend.isValid(body)) return callback(new Error('Invalid JSend response'))
    if (body.status === 'fail' || body.status === 'error') {
      return callback(new Error(body.message || body.data))
    }

    return callback(undefined, deconstruct ? body.data[0] : body.data)
  })
}

function Node (base, defaultParams) {
  var params = defaultParams ? ('?' + qs(defaultParams)) : ''
  var self = this

  this.addresses = {
    summary: function (addresses, callback) {
      req(base + '/addresses/summary' + params, {
        addresses: [].concat(addresses)
      }, self.xhrOptions, callback, !Array.isArray(addresses))
    },

    transactions: function (addresses, blockHeight, callback) {
      // optional blockHeight
      if ('function' === typeof blockHeight) {
        callback = blockHeight
        blockHeight = 0
      }

      req(base + '/addresses/transactions' + params, {
        addresses: [].concat(addresses),
        blockHeight: blockHeight
      }, self.xhrOptions, callback)
    },

    unspents: function (addresses, callback) {
      req(base + '/addresses/unspents' + params, {
        addresses: [].concat(addresses)
      }, self.xhrOptions, callback)
    }
  }

  this.blocks = {
    get: function (blockIds, callback) {
      req(base + '/blocks/get' + params, {
        blockIds: [].concat(blockIds)
      }, self.xhrOptions, callback, !Array.isArray(blockIds))
    },

    latest: function (callback) {
      req(base + '/blocks/latest' + params, {}, self.xhrOptions, callback)
    },

    propagate: function (blockHex, callback) {
      req(base + '/blocks/propagate' + params, {
        blockHex: blockHex
      }, self.xhrOptions, callback)
    },

    summary: function (blockIds, callback) {
      req(base + '/blocks/summary' + params, {
        blockIds: [].concat(blockIds)
      }, self.xhrOptions, callback, !Array.isArray(blockIds))
    }
  }

  this.transactions = {
    get: function (txIds, callback) {
      req(base + '/transactions/get' + params, {
        txIds: [].concat(txIds)
      }, self.xhrOptions, callback, !Array.isArray(txIds))
    },

    latest: function (callback) {
      req(base + '/transactions/latest' + params, {}, self.xhrOptions, callback)
    },

    propagate: function (txHex, callback) {
      req(base + '/transactions/propagate' + params, {
        txHexs: [].concat(txHex)
      }, self.xhrOptions, callback)
    },

    summary: function (txIds, callback) {
      req(base + '/transactions/summary' + params, {
        txIds: [].concat(txIds)
      }, self.xhrOptions, callback, !Array.isArray(txIds))
    }
  }

  this.xhrOptions = {}
}

module.exports = Node
