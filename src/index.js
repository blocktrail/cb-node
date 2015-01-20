var Addresses = require('./addresses')
var Blocks = require('./blocks')
var Transactions = require('./transactions')

function Node(baseURL, network) {
  this.addresses = new Addresses(baseURL + 'addresses')
  this.blocks = new Blocks(baseURL + 'blocks')
  this.transactions = new Transactions(baseURL + 'transactions')

  this.network = network || 'bitcoin'
}

Node.Addresses = Addresses
Node.Blocks = Blocks
Node.Transactions = Transactions

Node.prototype.getNetwork = function() { return this.network }

module.exports = Node
