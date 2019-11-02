const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const Comic = require('../../../models/Comic')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      Comic.findById(req.query.comic_id, function (err, comic) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Comic found', comic })
        }
      })
      break
    case 'PUT':
      Comic.findByIdAndUpdate(req.query.comic_id, { $set: req.body.update }, function (err, comic) {
        if (err) {
          console.log(err)
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Comic updated', comic })
        }
      })
      break
    case 'DELETE':
      Comic.findByIdAndRemove(req.params.comic_id, function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Comic deleted', result })
        }
      })
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
