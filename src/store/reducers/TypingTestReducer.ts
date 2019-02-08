import { TYPING_TEST_IS_ACTIVE } from '../../constants';
import { TypingGameInfoI } from '../../types/typesIndex';

const initialState: TypingGameInfoI = {
  instanceId: '',
  letters: [],
  isGameActive: false
};

export default function GameReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case TYPING_TEST_IS_ACTIVE:
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
