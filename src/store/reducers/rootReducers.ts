import { combineReducers } from 'redux';
import gameData from './gameData';
import serverStatus from './serverStatus';
import authRedcuer from './authReducer';
import myData from './myDataReducer';
import gameHistoriesReducer from '../../pages/GamesHistory/redux/GamesHistoryReducer';

export default combineReducers({
  gameData,
  serverStatus,
  authentication: authRedcuer,
  myData,
  gamesHistory: gameHistoriesReducer
});
