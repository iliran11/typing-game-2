import { connect } from 'react-redux';
import CompetitorList from './CompetitorList';
import { RootState, PlayerGameStatus, PlayerAvatar } from '../../types';

const mapStateToProps = (state: RootState) => {
  // @ts-ignore
  const playersGameStatus: PlayerGameStatus[] = Object.values(
    state.serverStatus.playersGameStatus
  );
  const avatars: PlayerAvatar[] = playersGameStatus.map(playersGameStatus => {
    return {
      isAnonymous: true,
      picture: 2
    };
  });
  const { myId, roomId, roomSize } = state.serverStatus;

  return {
    players: playersGameStatus,
    myId,
    roomId,
    roomSize,
    avatars
  };
};

export default connect(mapStateToProps)(CompetitorList);
