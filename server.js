const express = 'express'
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Character = require('./api/Character')
const Comic = require('./api/Comic')
const Creator = require('./api/Creator')
const Media = require('./api/Media')

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

  /* Characters
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  router.route('/api/v1/characters').get(Character.getCharacters)
  router.route('/api/v1/characters/:user_id').get(Character.getCharacter)
  router.route('/api/v1/characters').post(Character.addCharacter)
  router.route('/api/v1/characters/:user_id').put(Character.updateCharacter)
  router.route('/api/v1/characters/:user_id').delete(Character.deleteCharacter)

  /* Comics
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  router.route('/api/v1/comics').get(Comic.getComics)
  router.route('/api/v1/comics/:comic_id').get(Comic.getComic)
  router.route('/api/v1/comics').post(Comic.addComic)
  router.route('/api/v1/comics/:comic_id').put(Comic.updateComic)
  router.route('/api/v1/comics/:comic_id').delete(Comic.deleteComic)

  /* Creators
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  router.route('/api/v1/creators').get(Creator.getCreators)
  router.route('/api/v1/creators/:creator_id').get(Creator.getCreator)
  router.route('/api/v1/creators').post(Creator.addCreator)
  router.route('/api/v1/creators/:creator_id').put(Creator.updateCreator)
  router.route('/api/v1/creators/:crator_id').delete(Creator.deleteCreator)

  /* Media
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  router.route('/api/v1/media').get(Media.getItems)
  router.route('/api/v1/media/:item_id').get(Media.getItem)
  router.route('/api/v1/media').post(Media.addItem)
  router.route('/api/v1/media/:item_id').put(Media.updateItem)
  router.route('/api/v1/media/:item_id').delete(Media.deleteItem)

  server.use(router)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8001, (err) => {
    if (err) throw err
    console.log('Running on 8001')
  })
})
