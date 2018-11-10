import { GAME_HAS_FINISHED } from "../constants";
export function gameIsFinished() {
  return {
    type: GAME_HAS_FINISHED
  };
}
