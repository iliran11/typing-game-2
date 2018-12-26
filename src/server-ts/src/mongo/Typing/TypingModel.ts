import TypingScheme from './TypingScheme';
import { TypingModelI } from '../../../../types';
const mongoose = require('mongoose');

export const TypingModel = mongoose.model('Typing', TypingScheme);

export function createTypingRecord(typingModel: TypingModelI) {
  return new TypingModel(typingModel);
}
