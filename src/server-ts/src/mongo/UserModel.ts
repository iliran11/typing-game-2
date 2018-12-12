import UserSchame from './UserSchema';
import { UserModelInterface } from '../../../types';
const mongoose = require('mongoose');
const User = mongoose.model('user', UserSchame);

function UserModel(model: UserModelInterface) {
  return new User(model);
}

export default UserModel;
