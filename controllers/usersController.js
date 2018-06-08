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
    console.log('GET user and drinks')
    console.log(`req.params.id: ${req.params.user_id}`);
    db.Drink
        .find({user_id: req.params.user_id},function (err, drinks) {
            console.log(drinks);
            res.json(drinks);
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
    destroy: destroy,
    userDrinks: userDrinks
}