
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define poll schema
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pollsVoted: {
    type: Array,
    required: true
  }}, 
{
  timestamps: true
});

// Create Poll model using poll schema
var Users = mongoose.model('User', userSchema);

// Make this available outside this module
module.exports = Users;