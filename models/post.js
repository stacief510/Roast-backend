const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user' );

const PostSchema = new Schema ({
	drink: String,
	store: String,
    review_title: String,
    review: String,
    rating: Number,
    drink_photo: String,
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
