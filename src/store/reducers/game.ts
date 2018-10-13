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
      const lettersData = action.payload.letters.map((letter: string) => {
        return new Letter(letter);
      });
      return {
        ...state,
        letters: lettersData
      };
  }

  return state;
}
