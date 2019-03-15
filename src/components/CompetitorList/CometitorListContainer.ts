import { connect } from 'react-redux';
import { CompetitorList } from './CompetitorList';
import { RootState, PlayerAvatar } from '../../types';
import { PlayerGameStatus } from '../../types/GameStatusType';

const mapStateToProps = (state: RootState, ownProps: any) => {
  const roomInfo = state.multiplayerMapping[ownProps.roomId];
  // @ts-ignore
  const playersGameStatus: PlayerGameStatus[] = Object.values(
    roomInfo.playersGameStatus
  );
  const avatars: PlayerAvatar[] = playersGameStatus.map(playerGameStatus => {
    return playerGameStatus.avatar;
  });
  const { myId } = state.serverStatus;
  const roomSize = roomInfo.roomSize;

  return {
    players: playersGameStatus,
    myId,
    roomId: roomInfo.roomId,
    roomSize,
    avatars
  };
};

export const CompetitorListContainer = connect(mapStateToProps)(CompetitorList);
