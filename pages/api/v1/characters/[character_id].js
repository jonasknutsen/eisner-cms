const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const Character = require('../../../models/Character')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      Character.findById(req.query.character_id, function (err, character) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Character found', character })
        }
      })
      break
    case 'PUT':
      Character.findByIdAndUpdate(req.query.character_id, { $set: req.body.update }, function (err, character) {
        if (err) {
          console.log(err)
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Character updated', character })
        }
      })
      break
    case 'DELETE':
      Character.findByIdAndRemove(req.params.character_id, function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Character deleted', result })
        }
      })
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
