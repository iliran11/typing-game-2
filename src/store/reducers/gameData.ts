import Letter from "../classes/lettterData";
import { SET_GAME_LETTERS,GAME_HAS_FINISHED } from "../../constants";

// const letters : Letter[] = [new ]
interface Game {
  letters: Letter[];
  isGameFinished: boolean
}
const initialState: Game = {
  letters: [],
  // indicated if the game is over for the current local player.
  isGameFinished: false
};

export default function GameReducer(
  state: Game = initialState,
  action: any
): Game {
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
