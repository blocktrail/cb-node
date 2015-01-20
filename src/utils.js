var jsend = require('jsend')
var httpify = require('httpify')

function jsendBatchedRequest(url, postParams, plural, callback) {
  httpify({
    url: url,
    method: 'POST',
    json: true,
    body: postParams
  }, function (err, res, body) {
    if (err) return callback(err)

    if (!jsend.isValid(body)) {
      return callback(new Error('Invalid JSend Response ' + JSON.stringify(body)))
    }

    return callback(undefined, plural ? body.data : body.data[0])
  })
}

module.exports = {
  jsendBatchedRequest: jsendBatchedRequest
}
