import { combineReducers } from "redux";
import gameData from "./gameData";
import serverStatus from "./serverStatus";

export default combineReducers({
  gameData,
  serverStatus
});
