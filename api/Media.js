// Items
const mongoose = require('mongoose')
const config = require('../config/config')
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true })

var Item = require('../models/Item')

exports.getItems = function (req, res) {
  Item.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, crators) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Items found', crators })
    }
  })
}

exports.getItem = function (req, res) {
  Item.findById(req.params.item_id, function (err, item) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Item found', item })
    }
  })
}

exports.updateItem = function (req, res) {
  Item.findByIdAndUpdate(req.params.item_id, { $set: req.body.update }, function (err, item) {
    if (err) {
      console.log(err)
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Item updated', item })
    }
  })
}

exports.deleteItem = function (req, res) {
  Item.findByIdAndRemove(req.params.item_id, function (err, result) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(200).json({ success: true, message: 'Item deleted', result })
    }
  })
}

exports.addItem = function (req, res) {
  const item = new Item()

  item.nane = req.body.name
  item.description = req.body.description
  item.heroImage = req.body.heroImage

  item.save(function (err, result) {
    if (err) {
      return res.status(200).json({ success: false, message: err })
    } else {
      return res.status(201).json({ success: true, message: 'Item added', result })
    }
  })
}
