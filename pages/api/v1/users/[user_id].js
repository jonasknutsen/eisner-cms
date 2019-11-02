const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const User = require('../../../models/User')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      User.findById(req.query.user_id, function (err, user) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'User found', user })
        }
      })
      break
    case 'PUT':
      User.findByIdAndUpdate(req.query.user_id, { $set: req.body.update }, function (err, user) {
        if (err) {
          console.log(err)
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'User updated', user })
        }
      })
      break
    case 'DELETE':
      User.findByIdAndRemove(req.params.user_id, function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'User deleted', result })
        }
      })
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
