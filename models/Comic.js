var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ComicSchema = new Schema({
  name: String,
  character: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  description: String,
  heroImage: String,
  artists: [{ type: Schema.Types.ObjectId, ref: 'Creator' }],
  authors: [{ type: Schema.Types.ObjectId, ref: 'Creator' }],
  inkers: [{ type: Schema.Types.ObjectId, ref: 'Creator' }],
  colorists: [{ type: Schema.Types.ObjectId, ref: 'Creator' }]
})

module.exports = mongoose.model('Comic', ComicSchema)
