import {
  AUTH_HEADER_NAME,
  AUTH_FACEBOOK_HEADER,
  SECRET
} from '../../constants';
const request = require('request');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbPassword = 'bEKqgqW38Ts5Naek';
const dbUser = 'admin';
let dev_db_url = `mongodb://${dbUser}:${dbPassword}@ds127624.mlab.com:27624/typing-game`;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('hello database');
});
import { LoginTokenObject, FacebookUserType } from '../../types';

mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;

import ServerManager from './classes/ServerManager';

// var packageJs = require('../package.json');

var app = require('express')();
var server = require('http').Server(app);
const port = process.env.PORT || 4001;
server.listen(port);

const image2base64 = require('image-to-base64');
const picUrl =
  'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10153722535952924&height=50&width=50&ext=1546903893&hash=AeQZGRjk82nf0DRR';

image2base64(picUrl) // you can also to use url
  .then(response => {
    // console.log(response); //cGF0aC90by9maWxlLmpwZw==
  })
  .catch(error => {
    // console.log(error); //Exepection error....
  });

// WARNING: app.listen(80) will NOT work here!
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/bye', function(req, res) {
  // res.send(`ddServer Version: ${packageJs.version}`);
  res.send(200);
});
app.get('/picturebase64', function(req, res) {
  request(picUrl, (error, response, body) => {
    // var buffer = new Buffer(body);
    // var string = buffer.toString('base64');
    console.log(body);

    res.send(200);
  });
});
app.post('/login', function(req, res) {
  const facebookToken = req.body[AUTH_FACEBOOK_HEADER];
  const fields = 'id,first_name,last_name';
  var path = `https://graph.facebook.com/v3.2/me?fields=${fields}&access_token=${facebookToken}`;
  request(path, (error, response, body) => {
    const userData: FacebookUserType = JSON.parse(body);
    if (error) {
      res.send(400);
    }
    jwt.sign({ userData }, SECRET, (err, token) => {
      const response: LoginTokenObject = { token };
      res.send({
        token
      });
    });
  });
});

app.get('/verify-login', function(req, res) {
  const appToken = req.headers[AUTH_HEADER_NAME];
  jwt.verify(appToken, SECRET, function(err, decoded) {
    if (err) {
      res.status(400).send({
        error: err
      });
    }
    if (decoded) {
      res.status(200).send({
        loginStatus: true
      });
    }
  });
});
const serverManager = ServerManager.getInstance(server);
console.log('server started.');
