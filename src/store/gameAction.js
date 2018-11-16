import { GAME_HAS_FINISHED,RESTART_GAME } from "../constants";
export function gameIsFinished() {
  return {
    type: GAME_HAS_FINISHED
  };
}

export function restartGame() {
  return function(dispatch, getState) {
    dispatch({
      type: RESTART_GAME
    })
  }
}
