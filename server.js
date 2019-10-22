const express = 'express'
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(express.static('static'))
  server.use(bodyParser.json())
  server.use(cookieParser())

  var router = express.Router()

  server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next()
  })

  server.use(router)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8001, (err) => {
    if (err) throw err
    console.log('Running on 8001')
  })
})
