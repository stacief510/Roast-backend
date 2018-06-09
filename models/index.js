var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost/roast-backend");

module.exports.Post = require('./post.js');
module.exports.User = require('./user.js');