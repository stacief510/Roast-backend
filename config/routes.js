const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('./keys');
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
router.get('/drinks',  postsController.index);
//post for drinks
router.post('/users/:user_id/drinks', postsController.create);
//delete drinks (aka review)
router.delete('/users/:user_id/drinks/:drink_id', postsController.destroy);
//show for one drink
router.get('/users/:user_id/drinks/:drink_id',  postsController.show);
//update a review (aka drink)
router.put('/users/:user_id/drinks/:drink_id',  postsController.update);

// GET /test (Public)
router.get('/test', (req, res) => res.json({msg: 'Users Endpoint Ok'}));

// GET api/users/register (Public)
router.post('/register', (req, res) => {
  // Find User By Email
  User.findOne({ email: req.body.email })
    .then(user => {
      // If email already exists, send 400 response
      if(user) {
        return res.status(400).json({email: 'Email already exists'});
        // If email does not already exist, create new user
      } else {
        // Get avatar from Gravatar
        const avatar = gravatar.url(req.body.email, {
          s: '200', // avatar size option
          r: 'pg', // avatar rating option
          d: 'mm', // default avatar option
        });

        // Create new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          current_city: req.body.current_city,
          avatar,
          password: req.body.password,
        });

        // Salt and Hash password with bcryptjs, then save new user
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })

      }
    })
});

// GET api/users/login (Public)

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find User by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if(!user) {
        return res.status(404).json({ email: 'User not found' })
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User matched, send JSON Web Token

            // Create token payload (you can include anything you want)
            const payload = { id: user.id, name: user.name, avatar: user.avatar }

            // Sign token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({ success: true, token: 'Bearer ' + token })
            });
          } else {
            return res.status(400).json({ password: 'Password or email is incorrect' })
          }
        })
    })
});

// GET /users/current (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ msg: 'Success' })
//   res.json(req.user);
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
  })
});


module.exports = router;