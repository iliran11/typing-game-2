import { SET_GAME_LETTERS,GAME_HAS_FINISHED } from "../../constants";
import {GameDataReducer} from '../../types'

// const letters : Letter[] = [new ]

const initialState: GameDataReducer = {
  letters: [],
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
        letters: action.payload.letters
      };
    case GAME_HAS_FINISHED:
      return {
        ...state,
        isGameFinished:true
      }
  }

  return state;
}
