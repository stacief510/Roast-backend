const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const postsController = require('../controllers/postsController');

// User Routes
//index for all users
router.get('/users', usersController.index);
//post/create a new users
router.post('/users', usersController.create);
//show a user
router.get('/users/:user_id', usersController.show);
//edit a user
router.put('/users/:user_id', usersController.update);
//delete a user
router.delete('/users/:user_id', usersController.destroy);
//show all users drinks
router.get('/users/:user_id/drinks', usersController.userDrinks);


//index for all drinks
router.get('/drinks', postsController.index);
//post for drinks
router.post('/users/:user_id/drinks', postsController.create);
//delete drinks (aka review)
router.delete('/users/:user_id/drinks/:drink_id', postsController.destroy);
//show for one drink
router.get('/users/:user_id/drinks/:drink_id', postsController.show);
//update a review (aka drink)
router.put('/users/:user_id/drinks/:drink_id', postsController.update);


module.exports = router;