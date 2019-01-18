import { connect } from 'react-redux';
import CompetitorList from './CompetitorList';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  // @ts-ignore
  const playersGameStatus = Object.values(state.serverStatus.playersGameStatus);
  const { myId, roomId, roomSize } = state.serverStatus;
  return {
    players: playersGameStatus,
    myId,
    roomId,
    roomSize
  };
};

export default connect(mapStateToProps)(CompetitorList);
