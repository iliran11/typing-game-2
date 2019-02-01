import { connect } from 'react-redux';
import CompetitorList from './CompetitorList';
import { RootState, PlayerAvatar } from '../../types';
import { PlayerGameStatus } from '../../types/GameStatusType';

const mapStateToProps = (state: RootState) => {
  // @ts-ignore
  const playersGameStatus: PlayerGameStatus[] = Object.values(
    state.serverStatus.playersGameStatus
  );
  const avatars: PlayerAvatar[] = playersGameStatus.map(playerGameStatus => {
    return playerGameStatus.avatar;
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
