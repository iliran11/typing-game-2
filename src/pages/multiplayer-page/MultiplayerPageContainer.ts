import { connect } from 'react-redux';
import { RootState } from '../../types';
import MultiplayerPage from './Multiplayerpage';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const isGameActive = state.multiplayerMapping[props.roomId]
    ? state.multiplayerMapping[props.roomId].isGameActive
    : false;
  console.log(isGameActive);
  return {
    isGameActive,
    isSocketConnected: state.serverStatus.socketConnected,
    words: state.gameData.words,
    roomId: state.serverStatus.activeRoomId,
    myId: state.serverStatus.myId
  };
};
export const MultiplayerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiplayerPage);
