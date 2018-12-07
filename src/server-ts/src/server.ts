const request = require('request');
var jwt = require('jsonwebtoken');
const secret = 'secret-key';
var base64Img = require('base64-img');
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
