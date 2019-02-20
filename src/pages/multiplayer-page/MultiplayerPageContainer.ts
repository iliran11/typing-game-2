import { connect } from 'react-redux';
import { RootState } from '../../types';
import MultiplayerPage from './Multiplayerpage';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const words = state.gameData.words;
  const roomId = state.serverStatus.activeRoomId;
  const isGameActive = state.multiplayerMapping[roomId]
    ? state.multiplayerMapping[roomId].isGameActive
    : false;
  return {
    isGameActive,
    isSocketConnected: state.serverStatus.socketConnected,
    words: state.gameData.words,
    roomId: state.serverStatus.activeRoomId
  };
};
export const MultiplayerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiplayerPage);
