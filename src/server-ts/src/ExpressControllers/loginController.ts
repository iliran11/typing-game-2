import { AUTH_FACEBOOK_HEADER } from '../../../constants';
import { FacebookUserType, LoginResponse } from '../../../types';
const request = require('request');
const jwt = require('jsonwebtoken');
import { getBase64FacebookPic } from '../utilities';
import { createUserInstance, User } from '../mongo/User/UserModel';

export default function loginController(req, res) {
  const facebookToken = req.body[AUTH_FACEBOOK_HEADER];
  const fields = 'id,first_name,last_name,picture.width(100)';
  var path = `https://graph.facebook.com/v3.2/me?fields=${fields}&access_token=${facebookToken}`;
  request(path, (error, response, body) => {
    const data = JSON.parse(body);
    const { id, first_name: firstName, last_name: lastName } = data;
    const userData: FacebookUserType = {
      id,
      firstName,
      lastName
    };

    if (error) {
      res.send(400);
    }
    jwt.sign(userData, process.env.SERVER_AUTH_SECRET, (err, token) => {
      const user = createUserInstance({
        firstName,
        lastName,
        id
      });
      const loginResponse: LoginResponse = {
        token,
        data: { firstName, lastName, facebookId: id }
      };
      res.send(loginResponse);
      user.isAlreadyExist().then(isAlreadyExist => {
        /** we will resolve regardless of the result.
         *  the assumption is that the user will exist in the database anyway.
         *  so we want to resolve the promise to start updating the profile picture.
         */
        if (isAlreadyExist) {
          return;
        } else {
          user
            .save()
            .then(() => {
              return;
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    });
  });
}
