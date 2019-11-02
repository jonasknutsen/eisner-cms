const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const user = require('../../../models/User')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      User.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, users) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Users found', users })
        }
      })
      break
    case 'POST': {
      const user = new User()

      user.nane = req.body.name
      user.description = req.body.description
      user.heroImage = req.body.heroImage
      user.save(function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(201).json({ success: true, message: 'User added', result })
        }
      })
    }
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
