const request = require('request');
var jwt = require('jsonwebtoken');
const secret = 'secret-key';
const mongoose = require('mongoose');
const dbPassword = 'bEKqgqW38Ts5Naek';
const dbUser = 'admin';
let dev_db_url = `mongodb://${dbUser}:${dbPassword}@ds127624.mlab.com:27624/typing-game`;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('hello database')
});

mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;

import ServerManager from './classes/ServerManager';

// var packageJs = require('../package.json');

var app = require('express')();
var server = require('http').Server(app);
const port = process.env.PORT || 4001;
server.listen(port);
// WARNING: app.listen(80) will NOT work here!

app.get('/bye', function(req, res) {
  // res.send(`ddServer Version: ${packageJs.version}`);
  res.send(200);
});
app.post('/login', function(req, res) {
  const facebookToken = req.headers['authorization'];
  var path = `https://graph.facebook.com/v3.2/me?&access_token=${facebookToken}`;
  request(path, (error, response, body) => {
    const userData = JSON.parse(body);
    jwt.sign({ id: userData.id }, secret, (err, token) => {
      res.send(token);
    });
  });
});
const serverManager = ServerManager.getInstance(server);
console.log('server started.');
