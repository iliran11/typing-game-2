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
      const lettersGroupSize = 20;
      // devide all the letters to groups of letters. will help with performance while rendering.
      const lettersData = action.payload.letters.reduce(
        (accumulator: string[][], value: string, index: number) => {
          const currentGroupIndex = Math.floor(index / lettersGroupSize);
          if (Array.isArray(accumulator[currentGroupIndex])) {
            accumulator[currentGroupIndex].push(value);
          } else {
            accumulator[currentGroupIndex] = [value];
          }
          return accumulator;
        },
        []
      );
      return {
        ...state,
        letters: lettersData
      };
  }

  return state;
}
