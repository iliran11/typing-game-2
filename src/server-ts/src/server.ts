import { AUTH_HEADER_NAME, AUTH_FACEBOOK_HEADER } from '../../constants';
const request = require('request');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
import initMongo from './mongo/initMongo';
import {
  LoginTokenObject,
  FacebookUserType,
  HandShakeData,
  LoginVerificationStatus
} from '../../types';
import { createUserInstance, User } from './mongo/User/UserModel';
import ServerManager from './classes/ServerManager';
import { getBase64FacebookPic } from './utilities';

// var packageJs = require('../package.json');
const result = require('dotenv').config();
if (result.error) {
  console.log(result.error);
}
const SECRET = process.env.SERVER_AUTH_SECRET;
initMongo();
var app = require('express')();
var server = require('http').Server(app);
const port = 4001;
server.listen(port);
// WARNING: app.listen(80) will NOT work here!
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/bye', function(req, res) {
  // res.send(`ddServer Version: ${packageJs.version}`);
  res.send(200);
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
        data: { url: pictureUrl }
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
      const user = createUserInstance({
        firstName,
        lastName,
        id,
        picture: pictureUrl
      });
      const UserHandlingHasFinished = new Promise(resolve => {
        user.isAlreadyExist().then(isAlreadyExist => {
          /** we will resolve regardless of the result.
           *  the assumption is that the user will exist in the database anyway.
           *  so we want to resolve the promise to start updating the profile picture.
           */
          if (isAlreadyExist) {
            return resolve();
          } else {
            user
              .save()
              .then(() => {
                return resolve();
              })
              .catch(err => {
                console.log(err);
                return resolve();
              });
          }
        });
      });
      UserHandlingHasFinished.then(() => {
        // send response only after the server saved the url of the picture.
        // the server in the background will continue with saving the actual picture in the database
        res.send({
          token
        });
        getBase64FacebookPic(pictureUrl).then(pictureData => {
          User.findOne({ id })
            .then(user => {
              user.picture = `data:image/png;base64,${pictureData}`;
              return user.save();
            })
            .then(user => {
              console.log('picture Saved');
            });
        });
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
      User.getPictureById(decoded.id).then(picture => {
        const handshakeData: HandShakeData = {
          picture,
          firstName: decoded.firstName,
          lastName: decoded.lastName
        };
        const response: LoginVerificationStatus = {
          loginStatus: true,
          handshakeData
        };
        res.status(200).send(response);
      });
    }
  });
});
const serverManager = ServerManager.getInstance(server);
console.log('server started.');
