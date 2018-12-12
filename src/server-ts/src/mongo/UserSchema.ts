const mongoose = require('mongoose');
import { User } from './UserModel';
const UserScheme = mongoose.Schema({
  firstName: String,
  lastName: String,
  id: String,
  picture: String
});

UserScheme.methods.isAlreadyExist = function() {
  return new Promise(resolve => {
    const queryId = this.id;
    if (queryId) {
      User.find({ id: queryId }).then(result => {
        if (result.length === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    }
  });
};

export default UserScheme;
