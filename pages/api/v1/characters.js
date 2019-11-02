const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const Character = require('../../../models/Character')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      Character.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, characters) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Characters found', characters })
        }
      })
      break
    case 'POST': {
      const character = new Character()

      character.nane = req.body.name
      character.description = req.body.description
      character.heroImage = req.body.heroImage
      character.save(function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(201).json({ success: true, message: 'Character added', result })
        }
      })
    }
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
