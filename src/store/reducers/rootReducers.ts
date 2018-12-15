import { combineReducers } from 'redux';
import gameData from './gameData';
import serverStatus from './serverStatus';
import authRedcuer from './authReducer';
import myData from './myDataReducer';

export default combineReducers({
  gameData,
  serverStatus,
  authentication: authRedcuer,
  myData
});
