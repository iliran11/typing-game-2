import { connect } from 'react-redux';
import { RootState } from '../../types';
import MultiplayerPage from './Multiplayerpage';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const words = state.gameData.words;
  return {
    gameIsLoaded: words.length > 0,
    isSocketConnected: state.serverStatus.socketConnected,
    words: state.gameData.words
  };
};
export const MultiplayerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiplayerPage);
