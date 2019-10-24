const config = require('../config/config')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var mongoose = require('mongoose')
mongoose.connect(config.database, { useNewUrlParser: true })

var User = require('../models/user')

exports.authenticate = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err

    if (!user) {
      return res.status(200).json({ success: false, message: 'User not found' })
    } else if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) throw err
        if (!result) {
          return res.status(200).json({ success: false, message: 'The password does not match' })
        } else {
          const payload = {
            name: user.name,
            email: user.email,
            apps: user.apps
          }
          var token = jwt.sign(payload, config.secret, {
            expiresIn: 1440
          })
          return res.status(200).json({ success: true, message: 'Logged in', token: token, email: req.body.email })
        }
      })
    }
  })
}

exports.verify = function (req, res) {
  var token = req.body.token

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate' })
      } else {
        return res.json({ success: true, message: 'Authenticated', decoded })
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token'
    })
  }
}
