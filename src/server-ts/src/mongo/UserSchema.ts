const mongoose = require('mongoose');
const UserScheme = mongoose.Schema({
  firstName: String,
  lastName: String,
  id: String,
  picture: String
});

UserScheme.pre('save', function(next) {
  const User = mongoose.model('user', UserScheme);
  // @ts-ignore
  const queryId = this.id;
  if (queryId) {
    User.find({ id: queryId }).then(result => {
      if (result.length === 0) {
        return next();
      }
      next(
        // @ts-ignore
        Error(`${this.firstName} has login and not saved as it already exists.`)
      );
    });
  }
});

export default UserScheme;
