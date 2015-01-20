var assert = require('assert')
var Blockchain = require('../src/index')

var url = 'http://localhost:8080'

describe('Blockchain', function() {
  describe('Constructor', function() {
    it('defaults to the bitcoin network', function() {
      var blockchain = new Blockchain(url)

      assert.equal(blockchain.getNetwork(), 'bitcoin')
    })
  })

  describe('getNetwork', function() {
    it('returns the underlying network name', function() {
      var blockchain = new Blockchain(url, 'testnet')

      assert.equal(blockchain.getNetwork(), 'testnet')
    })

    it('throws on unknown network', function() {
      assert.throws(function() {
        new Blockchain(url, 'zoidberg')
      }, /Unknown network: zoidberg/)
    })
  })
})

describe('cb-tests', function() {
	var options = {}

	beforeEach(function() {
		options.blockchain = new Blockchain(url, 'testnet')
	})

	require('cb-tester')(options)
})
