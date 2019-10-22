var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CreatorSchema = new Schema({
  name: String,
  description: String,
  heroImage: String
})

module.exports = mongoose.model('Creator', CreatorSchema)
