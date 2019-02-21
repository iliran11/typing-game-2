import { connect } from 'react-redux';
import { MultiplayerResultPage } from './ResultsPage';
import { ROOM_ID_PARM } from '../../constants';
import { PlayerGameStatus } from '../../types/typesIndex';
import { RootState } from '../../types/typesIndex';
import { fetchReplay } from '../../store/gameAction';

const mapDispatchToProps = { fetchReplay };
const mapStateToProps = (state: RootState, props: any) => {
  const queryString = require('query-string');
  const roomId = queryString.parse(props.location.search)[ROOM_ID_PARM];
  const players = getPlayersStatus(state, roomId);

  return {
    roomId,
    myId: state.serverStatus.myId,
    players
  };
};
export const MultiPlayerResultPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiplayerResultPage);

function getPlayersStatus(
  state: RootState,
  roomId: string
): PlayerGameStatus[] {
  const multiplayerRoom = state.multiplayerMapping[roomId];
  if (multiplayerRoom) {
    const result: PlayerGameStatus[] = [];
    for (const playerStatus in multiplayerRoom.playersGameStatus) {
      result.push(multiplayerRoom.playersGameStatus[playerStatus]);
    }
    return result;
  }
  const gameHistory = state.gamesHistory[roomId];
  if (gameHistory) {
    return gameHistory.players;
  }
  return [];
}
