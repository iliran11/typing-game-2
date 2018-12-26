import { LOAD_TYPING } from '../../constants';
import { TypingReducerI, TypingModelI } from '../../types';

const initialState: TypingReducerI = {};

export default function GameReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case LOAD_TYPING:
      return loadTyping(state, action.payload);
    default:
      return state;
  }
}

function loadTyping(state: TypingReducerI, data: TypingModelI[]) {
  if (data.length === 0) return state;
  const typingId = `${data[0].gameId}-${data[0].playerId}`;
  return {
    ...state,
    [typingId]: data
  };
}
