import { connect } from 'react-redux';
import ReplayPage from './ReplayPage';
const queryString = require('query-string');
import { fetchReplay } from '../../store/gameAction';
import { RootState } from '../../types';
import { ROOM_ID_PARM } from '../../constants';

const mapStateToProps = (state: RootState, ownProps: any) => {
  const roomId = queryString.parse(ownProps.location.search)[ROOM_ID_PARM];
  const gameInfo = state.gamesHistory[roomId];
  const replay = state.replays[roomId];
  const myId = state.myData.facebookId;
  return {
    myId,
    roomId,
    gameInfo,
    replay,
    gameHistory: state.gamesHistory[roomId]
  };
};

const mapDispatchToProps = {
  fetchReplay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplayPage);
