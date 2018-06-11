var db = require('../models');

function index(req, res){
    console.log('GET posts index')
    db.Post.find({}, function(err, post){
        if(err){
            res.send(err);
        }
        return res.json(post);
    });
}

function create(req, res){
    console.log('POST drink')
	db.Post.create(req.body, function(err, newPost){
		if(err){
			res.send(err);
		}else{
			db.User.findById(req.params.user_id, function(err, userSuccess) {
				if (err) console.log(err);
				else {
					console.log(`44444 req.params.id: ${req.params.user_id}`);
					console.log('new post userid here', newPost.user_id)
					// newPost.user_id.push(userSuccess._id);
					// userSuccess.save();
					res.json(newPost);
				}
			});
		}
	});
}

function show(req, res){
	console.log('GET one drink post')
	console.log(`req.params.id: ${req.params.drink_id}`);
	db.Post.findById(req.params.drink_id, function(err,foundPost){
		res.json(foundPost);
	});
}

function update(req, res){
	// console.log(JSON.stringify(req.body))
	db.Post.findByIdAndUpdate(req.params.drink_id,
		{$set: req.body}, function(err, foundPost) {
		if (err) {
            console.log(err);
        } else {
			foundPost.drink = req.body.drink;
            foundPost.store = req.body.store;
			foundPost.review_title = req.body.review_title;
			foundPost.review = req.body.review;
			foundPost.rating = req.body.rating;
			foundPost.drink_photo = req.body.drink_photo;
			res.json(foundPost);
		}
	});
}


function destroy(req, res){
    console.log('Deleting a drink...')
    db.Post.findByIdAndRemove(req.params.drink_id, function(err,foundPost){
        if (err){
            console.log(err);
        }
		res.send("drink review deleted");
	});
}

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy
}