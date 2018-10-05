import Letter from "../classes/lettter";

// const letters : Letter[] = [new ]
interface Game {
  letters: Letter[];
}
const text: string = "hello world whats up";
const letters: Letter[] = text.split("").map(value => {
  return new Letter(value);
});
const initialState: Game = {
  letters
};

export default function GameReducer(state: Game = initialState): Game {
  return state;
}
