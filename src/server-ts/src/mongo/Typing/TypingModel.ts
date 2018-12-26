import { TypingScheme } from './TypingScheme';
import { TypingModel } from '../../../../types';
const mongoose = require('mongoose');

const TypingModel = mongoose.model('Typing', TypingScheme);

export function createTypingRecord(typingModel: TypingModel) {
  return new TypingModel(typingModel);
}
