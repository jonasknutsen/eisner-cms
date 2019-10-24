var config = require('../config/config')
var mongoose = require('mongoose')
mongoose.connect(config.database, { useNewUrlParser: true })

var User = require('../models/user')

exports.getUser = function (req, res) {
  User.findOne({ email: req.params.email }, function (err, user) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      var editedUser = {
        _id: user._id,
        name: user.name,
        email: user.email
      }
      return res.status(200).json({ success: true, message: 'User found', user: editedUser })
    }
  })
}
