import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST
} from '../../constants';
import {
  TypingTestGamesMapping,
  TypingGameInfoI
} from '../../types/typesIndex';

const initialState: TypingTestGamesMapping = {};

export default function GameReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case TYPING_TEST_IS_ACTIVE:
      return activateTypingGame(state, action.payload);
    case TYPING_TEST_SCORE_BROADCAST:
      return updateScoreBoard(state, action.payload);
    default:
      return state;
  }
}

function activateTypingGame(
  state: TypingTestGamesMapping,
  data: TypingGameInfoI
) {
  return {
    ...state,
    [data.roomId]: {
      ...data
    }
  };
}
function updateScoreBoard(
  state: TypingTestGamesMapping,
  data: TypingGameInfoI
) {
  const nextGameObject = { ...data };
  // we don't want to change the reference of words object here to save re-rendering
  nextGameObject.words = state[data.roomId].words;
  return {
    ...state,
    [data.roomId]: nextGameObject
  };
}
