import { connect } from 'react-redux';
import AchievementProgress from './AchievementsProgressPage';
import { ROOM_ID_PARM } from '../../constants';
const queryString = require('query-string');

const mapDispatchToProps = {};
const mapStateToProps = (state: any, ownProps: any) => {
  const roomId = queryString.parse(ownProps.location.search)[ROOM_ID_PARM];
  return { roomId };
};
export const AchievementProgressPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AchievementProgress);
