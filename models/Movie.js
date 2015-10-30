var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  watched: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Movie', MovieSchema);
