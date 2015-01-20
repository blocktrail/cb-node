var jsend = require('jsend')
var httpify = require('httpify')

function jsendBatchedRequest(url, postParams, plural, callback) {
  httpify({
    url: url,
    method: 'POST',
    json: true,
    body: postParams
  }, function (err, res) {
    if (err) return callback(err)

    var body = res.body
    if (!jsend.isValid(body)) return callback(new Error('Invalid JSend response'))
    if (body.status === 'fail' || body.status === 'error') return callback(new Error(JSON.stringify(body.data)))

    return callback(undefined, plural ? body.data : body.data[0])
  })
}

module.exports = {
  jsendBatchedRequest: jsendBatchedRequest
}
