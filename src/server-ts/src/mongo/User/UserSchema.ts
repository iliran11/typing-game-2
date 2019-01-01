const mongoose = require('mongoose');
import { User } from './UserModel';
const UserScheme = mongoose.Schema({
  firstName: String,
  lastName: String,
  id: String,
  picture: String,
  level: { type: Number, default: 1 }
});
UserScheme.statics.findById = function(id: String) {
  return new Promise(resolve => {
    this.findOne({ id }, function(error, user) {
      resolve(user);
    });
  });
};
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

UserScheme.methods.getPicture = function() {
  return new Promise(resolve => {
    const id = this.id;
    User.findOne({ id })
      .then(result => {
        resolve(result.picture);
      })
      .catch(err => {
        resolve(Error('no user is found'));
      });
  });
};

export default UserScheme;
