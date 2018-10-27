import Letter from "../classes/lettterData";
import { SET_GAME_LETTERS } from "../../constants";

// const letters : Letter[] = [new ]
interface Game {
  letters: Letter[];
}
const initialState: Game = {
  letters: []
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
  }

  return state;
}
