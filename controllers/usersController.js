var db = require('../models');

function index(req, res){
    console.log('GET user index')
    db.User.find({}, function(err, user){
        if(err){
            res.send(err);
        }
        return res.json(user);
    });
}

function create(req, res){
    console.log('POST user')
    console.log(req.body)
    db.User.create(req.body, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
}

function show(req,res){
    console.log('GET one user')
    console.log(`123 req.params.id: ${req.params.user_id}`);
    db.User.findById(req.params.user_id, function(err,foundUser){
        res.json(foundUser);
    });
}

function userDrinks(req,res){
    console.log('GET user and posts')
    console.log(`req.params.id: ${req.params.user_id}`);
    db.Post
        .find({user_id: req.params.user_id},function (err, posts) {
            console.log(posts);
            res.json(posts);
        })
}

function update(req, res) {
	User.findByIdAndUpdate(req.params.user_id, {$set: req.body}, function(err, updatedUser) {
		if (err) res.send('User update controller err: ', err);
		res.json(updatedUser);
	})
}

function destroy(req, res) {
	User.findByIdAndRemove(req.params.user_id, function(err, foundUser) {
		if (err) res.send('User destroy controller err: ', err);
		res.send(404);
	})
}


module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy,
    userDrinks: userDrinks
}