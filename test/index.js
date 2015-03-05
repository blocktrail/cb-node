var Blockchain = require('../src/index')
var url = 'https://common-blockchain-test.herokuapp.com'

describe('cb-tests', function () {
  var options = {}

  beforeEach(function () {
    options.blockchain = new Blockchain(url)
  })

  require('cb-tester')(options)
})
