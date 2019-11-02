const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const Creator = require('../../../models/Creator')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      Creator.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, creators) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Creators found', creators })
        }
      })
      break
    case 'POST': {
      const creator = new Creator()

      creator.nane = req.body.name
      creator.description = req.body.description
      creator.heroImage = req.body.heroImage
      creator.save(function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(201).json({ success: true, message: 'Creator added', result })
        }
      })
    }
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
