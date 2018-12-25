import { connect } from 'react-redux';
import CompetitorList from './CompetitorList';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  return {
    // @ts-ignore
    players: Object.values(state.serverStatus.playersGameStatus),
    myId: state.serverStatus.myId,
    roomId: state.serverStatus.roomId,
    roomSize: state.serverStatus.roomSize
  };
};

export default connect(mapStateToProps)(CompetitorList);
