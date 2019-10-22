var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostSchema = new Schema({
  title: String,
  content: String,
  excerpt: String,
  metaDescription: String,
  published: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now },
  comics: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
})

module.exports = mongoose.model('Post', PostSchema)
