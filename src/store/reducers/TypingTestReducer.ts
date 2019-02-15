import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST
} from '../../constants';
import { TypingGameInfoI, PlayerType } from '../../types/typesIndex';

const initialState: TypingGameInfoI = {
  instanceId: '',
  words: [],
  isGameActive: false,
  wpm: 0,
  cpm: 0,
  accuracy: 0,
  player: {
    id: '',
    type: PlayerType.human,
    name: '',
    avatar: {
      isAnonymous: false,
      picture: -1
    }
  }
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
  let words;
  // do not replace the reference of words if it already exists.
  // we will need to replace the reference only on game-restart event.
  if (state.words.length === 0) {
    words = data.words;
  } else {
    words = state.words;
  }
  return {
    ...state,
    ...data,
    words
  };
}
