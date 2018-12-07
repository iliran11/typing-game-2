import { combineReducers } from 'redux';
import gameData from './gameData';
import serverStatus from './serverStatus';
import authRedcuer from './authReducer';

export default combineReducers({
  gameData,
  serverStatus,
  authentication: authRedcuer
});
