const { success } = require(`@pheasantplucker/failables-node6`)
const http = require('http')

const PORT = 9000

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    switch (req.url) {
      case '/get': {
        const data = { text: 'the result' }
        res.write(JSON.stringify(data))
        break
      }
      case '/getJson': {
        const data = { text: 'the result' }
        res.write(JSON.stringify(data))
        break
      }
    }
    res.end()
  }
  if (req.method === 'POST') {
    switch (req.url) {
      case '/post':
        let responseBody = ''

        req.on('data', data => {
          responseBody += data
        })
        req.on('end', () => {
          res.write(responseBody)
          res.end()
        })
        break
      default:
    }
  }
})

const start = async () => {
  server.listen(PORT)
  return success()
}

const stop = async () => {
  server.close()
  return success()
}

module.exports = {
  start,
  stop,
  PORT,
}
