const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post');

// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },  
  current_city: {
    type: String,
  },
  posts: {
    type: [Post.Schema],
		ref: 'Post'
  }
  
});

module.exports = User = mongoose.model('user', UserSchema);
