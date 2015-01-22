var httpify = require('httpify')
var jsend = require('jsend')

function jsendBatchedRequest(url, body, plural, callback) {
  httpify({
    method: 'POST',
    url: url,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }, function (err, res) {
    if (err) return callback(err)
    if (res.statusCode !== 200) return callback(new Error('Error ' + res.statusCode))

    var body = res.body
    if (!jsend.isValid(body)) return callback(new Error('Invalid JSend response'))
    if (body.status === 'fail' || body.status === 'error') {
      return callback(new Error(body.data || body.message))
    }

    return callback(undefined, plural ? body.data : body.data[0])
  })
}

module.exports = {
  jsendBatchedRequest: jsendBatchedRequest
}
