const express = require('express');
const app = express();
const myRoutes = require('./config/routes');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});


app.get('/', function(req, res) {
	res.send('Server is working...');
});

app.use(myRoutes);

///LISTEN HERE
app.listen(process.env.PORT || 3001, function() {
	console.log('This server is listening on port 3001')
});