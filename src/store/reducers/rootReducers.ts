import { combineReducers } from "redux";
import gameData from "./game";
import serverStatus from "./serverStatus";

export default combineReducers({
  gameData,
  serverStatus
});
