
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define poll schema
var pollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  _id: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Create Poll model using poll schema
var Polls = mongoose.model('Poll', pollSchema);

// Make this available outside this module
module.exports = Polls;