var jsend = require('jsend')
var request = require('superagent')

function jsendBatchedRequest(url, postParams, plural, callback) {
  request
  .post(url)
  .send(postParams)
  .set('Accept', 'application/json')
  .end(function(err, res) {
    if (err) return callback(err)

    if (!jsend.isValid(res.body)) {
      return callback(new Error('Invalid JSend Response ' + JSON.stringify(res.body)))
    }

    callback(undefined, plural ? res.body.data : res.body.data[0])
  })
}

module.exports = {
  jsendBatchedRequest: jsendBatchedRequest
}
