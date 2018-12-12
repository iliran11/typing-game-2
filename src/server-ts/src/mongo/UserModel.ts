import UserSchame from './UserSchema';
import { UserModelInterface } from '../../../types';
const mongoose = require('mongoose');

export const User = mongoose.model('user', UserSchame);
export function createUserInstance(model: UserModelInterface) {
  return new User(model);
}
