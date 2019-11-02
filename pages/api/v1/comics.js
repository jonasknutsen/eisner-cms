const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const Comic = require('../../../models/Comic')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      Comic.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, comics) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Comics found', comics })
        }
      })
      break
    case 'POST': {
      const comic = new Comic()

      comic.nane = req.body.name
      comic.description = req.body.description
      comic.heroImage = req.body.heroImage
      comic.save(function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(201).json({ success: true, message: 'Comic added', result })
        }
      })
    }
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
