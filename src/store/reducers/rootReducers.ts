import { combineReducers } from 'redux';
import gameData from './gameData';
import serverStatus from './serverStatus';
import authRedcuer from './authReducer';
import myData from './myDataReducer';
import gameHistoriesReducer from '../../pages/GamesHistory/redux/GamesHistoryReducer';
import replaysReducer from '../../store/reducers/replaysReducer';
import typingReducer from '../../store/reducers/TypingsReducer';
import userAchievments from '../../store/reducers/UserAchievmentsReducer';
import HighlightsReducer from '../../store/reducers/HighlightsReducer';
import NotificationsReducer from '../../store/reducers/NotificationsReducer';
import AchievementsProgressReducer from '../../store/reducers/AchievementsProgressReducer';
import TypingTestReducer from '../../store/reducers/TypingTestReducer';
import { MultiplayerMappingReducer } from '../../store/reducers/MultiplayerMapping';

export default combineReducers({
  gameData,
  serverStatus,
  authentication: authRedcuer,
  myData,
  gamesHistory: gameHistoriesReducer,
  replays: replaysReducer,
  typing: typingReducer,
  userAchievments,
  highlights: HighlightsReducer,
  notificationsManager: NotificationsReducer,
  achievementsProgress: AchievementsProgressReducer,
  typingTest: TypingTestReducer,
  multiplayerMapping: MultiplayerMappingReducer
});
