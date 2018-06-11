const express = require('express');
const app = express();
const mongoose = require('mongoose');
const myRoutes = require('./config/routes');
const passport = require('passport');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

app.get('/', function(req, res) {
	res.send('Server is working...');
});

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB (using mLab)
mongoose.connect(db)
  .then((() => console.log('MongoDB connected...')))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport JWT Config
require('./config/passport')(passport);

app.use(myRoutes);

///LISTEN HERE
app.listen(process.env.PORT || 3001, function() {
	console.log('This server is listening on port 3001')
});