const mongoose = require('mongoose')
const config = require('../../../config/config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

const Item = require('../../../models/Item')

export default function handle (req, res) {
  switch (req.method) {
    case 'GET':
      Item.find({ active: true }, null, { sort: { timestamp: -1 } }, function (err, items) {
        if (err) {
          return res.status(200).json({ success: false, message: err })
        } else {
          return res.status(200).json({ success: true, message: 'Items found', items })
        }
      })
      break
    case 'POST': {
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
      break
    default:
      res.status(200).json({ success: false, message: 'Bad method' })
      break
  }
}
