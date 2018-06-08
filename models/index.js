var mongoose = require('mongoose');

// Map Global Promise to Resolve Mongo Promise Warning
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost/roast-backend")
        .then(() => console.log('Mongodb connected...'))
        .catch(err => console.log(err));  

module.exports.Post = require('./post.js');
module.exports.User = require('./user.js');