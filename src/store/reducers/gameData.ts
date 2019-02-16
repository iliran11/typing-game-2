import {
  LEAVE_GAME,
  SET_GAME_LETTERS,
  GAME_HAS_FINISHED,
  RESTART_GAME
} from '../../constants';
import { GameDataReducer } from '../../types';

// const letters : Letter[] = [new ]

const initialState: GameDataReducer = {
  words: [],
  // indicated if the game is over for the current local player.
  isGameFinished: false
};

export default function GameReducer(
  state: GameDataReducer = initialState,
  action: any
): GameDataReducer {
  switch (action.type) {
    case SET_GAME_LETTERS:
      return {
        ...state,
        words: action.payload.words
      };
    case GAME_HAS_FINISHED:
      return {
        ...state,
        isGameFinished: true
      };
    case RESTART_GAME:
      return initialState;
    case LEAVE_GAME:
      return {
        ...state,
        words: []
      };
  }

  return state;
}
