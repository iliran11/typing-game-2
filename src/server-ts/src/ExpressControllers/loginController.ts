import { AUTH_FACEBOOK_HEADER } from '../../../constants';
import { FacebookUserType, LoginTokenObject } from '../../../types';
const request = require('request');
const jwt = require('jsonwebtoken');
import { getBase64FacebookPic } from '../utilities';
import { createUserInstance, User } from '../mongo/User/UserModel';

const SECRET = process.env.SERVER_AUTH_SECRET;

export default function loginController(req, res) {
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
}
