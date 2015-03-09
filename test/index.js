var Blockchain = require('../src/index')
var url = 'https://common-blockchain-test.herokuapp.com'

describe('cb-tests', function () {
  var options = {}

  beforeEach(function () {
    options.blockchain = new Blockchain(url)
    options.blockchain.xhrOptions = {
      timeout: 1000000
    }
  })

  require('cb-tester')(options)
})
