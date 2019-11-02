const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const Item = require('../../../models/Item')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      Item.findById(req.query.item_id, function (err, item) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Item found', item })
        }
      })
      break
    case 'PUT':
      Item.findByIdAndUpdate(req.query.item_id, { $set: req.body.update }, function (err, item) {
        if (err) {
          console.log(err)
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Item updated', item })
        }
      })
      break
    case 'DELETE':
      Item.findByIdAndRemove(req.params.item_id, function (err, result) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Item deleted', result })
        }
      })
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
