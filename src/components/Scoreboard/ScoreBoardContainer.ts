import { connect } from 'react-redux';
import CompetitorList from './CompetitorList';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  // @ts-ignore
  const playerGameStatus = Object.values(state.serverStatus.playersGameStatus);
  return {
    players: state.serverStatus.isGameActive
      ? playerGameStatus
      : state.serverStatus.players,
    myId: state.serverStatus.myId,
    roomId: state.serverStatus.roomId,
    roomSize: state.serverStatus.roomSize
  };
};

export default connect(mapStateToProps)(CompetitorList);
