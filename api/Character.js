// Characters
const mongoose = require('mongoose')
const config = require('../config/config')
mongoose.connect(config.database, { useNewUrlParser: true })

var Character = require('../models/Character')

exports.getCharacters = function (req, res) {
  Character.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, crators) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Characters found', crators })
    }
  })
}

exports.getCharacter = function (req, res) {
  Character.findById(req.params.character_id, function (err, character) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Character found', character })
    }
  })
}

exports.updateCharacter = function (req, res) {
  Character.findByIdAndUpdate(req.params.character_id, { $set: req.body.update }, function (err, character) {
    if (err) {
      console.log(err)
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Character updated', character })
    }
  })
}

exports.deleteCharacter = function (req, res) {
  Character.findByIdAndRemove(req.params.character_id, function (err, result) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Character deleted', result })
    }
  })
}

exports.addCharacter = function (req, res) {
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
