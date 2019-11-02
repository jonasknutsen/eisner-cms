const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const Creator = require('../../../models/Creator')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      Creator.findById(req.query.creator_id, function (err, creator) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Creator found', creator })
        }
      })
      break
    case 'PUT':
      Creator.findByIdAndUpdate(req.query.creator_id, { $set: req.body.update }, function (err, creator) {
        if (err) {
          console.log(err)
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Creator updated', creator })
        }
      })
      break
    case 'DELETE':
      Creator.findByIdAndRemove(req.params.creator_id, function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Creator deleted', result })
        }
      })
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
