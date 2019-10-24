// Comics
const mongoose = require('mongoose')
const config = require('../config/config')
mongoose.connect(config.database, { useNewUrlParser: true })

var Comic = require('../models/Comic')

exports.getComics = function (req, res) {
  Comic.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, crators) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Comics found', crators })
    }
  })
}

exports.getComic = function (req, res) {
  Comic.findById(req.params.comic_id, function (err, comic) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Comic found', comic })
    }
  })
}

exports.updateComic = function (req, res) {
  Comic.findByIdAndUpdate(req.params.comic_id, { $set: req.body.update }, function (err, comic) {
    if (err) {
      console.log(err)
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Comic updated', comic })
    }
  })
}

exports.deleteComic = function (req, res) {
  Comic.findByIdAndRemove(req.params.comic_id, function (err, result) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Comic deleted', result })
    }
  })
}

exports.addComic = function (req, res) {
  const comic = new Comic()

  comic.nane = req.body.name
  comic.description = req.body.description
  comic.heroImage = req.body.heroImage

  comic.save(function (err, result) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(201).json({ success: true, message: 'Comic added', result })
    }
  })
}
