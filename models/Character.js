var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CharacterSchema = new Schema({
  name: String,
  description: String,
  heroImage: String
})

module.exports = mongoose.model('Character', CharacterSchema)
