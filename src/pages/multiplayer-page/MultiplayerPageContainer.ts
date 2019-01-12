import { connect } from 'react-redux';
import { RootState } from '../../types';
import MultiplayerPage from './Multiplayerpage';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const letters = state.gameData.letters;
  return {
    gameIsLoaded: letters.length > 0,
    isSocketConnected: state.serverStatus.socketConnected
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiplayerPage);
