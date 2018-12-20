import { AUTH_HEADER_NAME } from '../../../constants';
import { HandShakeData, LoginVerificationStatus } from '../../../types';
const SECRET = process.env.SERVER_AUTH_SECRET;
const jwt = require('jsonwebtoken');
import { User } from '../mongo/User/UserModel';

export default function verifyLoginController(req, res) {
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
}
