var Blockchain = require('../')
var url = process.env.BLOCKTRAIL_SDK_API_ENDPOINT ? (process.env.BLOCKTRAIL_SDK_API_ENDPOINT + "/cb/tBTC") : 'https://api.blocktrail.com/cb/tBTC'

describe('cb-tests', function () {
  var options = {}

  beforeEach(function () {
    options.blockchain = new Blockchain(url, {api_key: 'MY_APIKEY'})
    options.blockchain.xhrOptions = {
      timeout: 1000000
    }
  })

  require('cb-tester')(options)
})
