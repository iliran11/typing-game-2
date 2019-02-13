import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST
} from '../../constants';
import { TypingGameInfoI } from '../../types/typesIndex';

const initialState: TypingGameInfoI = {
  instanceId: '',
  words: [],
  isGameActive: false,
  wpm: 0,
  cpm: 0,
  accuracy: 0
};

export default function GameReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case TYPING_TEST_IS_ACTIVE:
    case TYPING_TEST_SCORE_BROADCAST:
      return activateTypingGame(state, action.payload);
    default:
      return state;
  }
}

function activateTypingGame(state: TypingGameInfoI, data: TypingGameInfoI) {
  return {
    ...state,
    ...data
  };
}
