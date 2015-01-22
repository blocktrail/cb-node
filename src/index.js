var Addresses = require('./addresses')
var Blocks = require('./blocks')
var Transactions = require('./transactions')

function Node(baseURL, network) {
  this.addresses = new Addresses(baseURL + '/addresses', 10000)
  this.blocks = new Blocks(baseURL + '/blocks', 10000)
  this.transactions = new Transactions(baseURL + '/transactions', 10000)

  this.network = network || 'bitcoin'
}

Node.Addresses = Addresses
Node.Blocks = Blocks
Node.Transactions = Transactions

Node.prototype.getNetwork = function() { return this.network }

module.exports = Node
