import { AUTH_HEADER_NAME } from '../../../constants';
import { HandShakeData, LoginVerificationStatus } from '../../../types';
const jwt = require('jsonwebtoken');
import { User } from '../mongo/User/UserModel';

//TODO: change name to check-login-status

// TODO: when there is no user, and verification success, there is no create of a user.
export default function verifyLoginController(req, res) {
  const appToken = req.headers[AUTH_HEADER_NAME];
  jwt.verify(appToken, process.env.SERVER_AUTH_SECRET, function(err, decoded) {
    if (err) {
      res.status(400).send({
        error: err
      });
    }
    if (decoded) {
      const handshakeData: HandShakeData = {
        facebookId: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        appToken
      };
      const response: LoginVerificationStatus = {
        loginStatus: true,
        handshakeData
      };
      res.status(200).send(response);
    }
  });
}
