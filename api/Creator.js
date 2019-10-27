// Creators
const mongoose = require('mongoose')
const config = require('../config/config')
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true })

var Creator = require('../models/Creator')

exports.getCreators = function (req, res) {
  Creator.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, crators) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Creators found', crators })
    }
  })
}

exports.getCreator = function (req, res) {
  Creator.findById(req.params.creator_id, function (err, creator) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Creator found', creator })
    }
  })
}

exports.updateCreator = function (req, res) {
  Creator.findByIdAndUpdate(req.params.creator_id, { $set: req.body.update }, function (err, creator) {
    if (err) {
      console.log(err)
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Creator updated', creator })
    }
  })
}

exports.deleteCreator = function (req, res) {
  Creator.findByIdAndRemove(req.params.creator_id, function (err, result) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Creator deleted', result })
    }
  })
}

exports.addCreator = function (req, res) {
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
