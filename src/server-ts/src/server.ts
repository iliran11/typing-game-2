import {
  AUTH_HEADER_NAME,
  AUTH_FACEBOOK_HEADER,
  SECRET
} from '../../constants';
const request = require('request');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
import initMongo from './mongo/initMongo';
import {
  LoginTokenObject,
  FacebookUserType,
  UserModelInterface
} from '../../types';
import UserModel from './mongo/UserModel';
import ServerManager from './classes/ServerManager';

// var packageJs = require('../package.json');
initMongo();
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
  const fields = 'id,first_name,last_name,picture.width(100)';
  var path = `https://graph.facebook.com/v3.2/me?fields=${fields}&access_token=${facebookToken}`;
  request(path, (error, response, body) => {
    const data = JSON.parse(body);
    const {
      id,
      first_name: firstName,
      last_name: lastName,
      picture: {
        data: { url }
      }
    } = data;
    const userData: FacebookUserType = {
      id,
      firstName,
      lastName
    };

    if (error) {
      res.send(400);
    }
    jwt.sign(userData, SECRET, (err, token) => {
      const response: LoginTokenObject = { token };
      res.send({
        token
      });
    });
    const user = UserModel({
      firstName,
      lastName,
      id,
      picture: url
    });
    user.save().catch(err => console.log(err));
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
