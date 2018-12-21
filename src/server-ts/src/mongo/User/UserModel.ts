import UserSchame from './UserSchema';
import { FacebookUserType } from '../../../../types';
const mongoose = require('mongoose');

export const User = mongoose.model('user', UserSchame);
export function createUserInstance(model: FacebookUserType) {
  return new User(model);
}
