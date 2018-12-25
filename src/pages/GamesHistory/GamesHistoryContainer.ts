import { connect } from 'react-redux';
import GamesHistory from './GamesHistory';
import { fetchGamesHistory } from './redux/gamesHistoryActions';
import { RootState } from '../../types';
import { navigateToReplay } from '../../store/gameAction';

const mapDispatchToProps = {
  fetchGamesHistory,
  navigateToReplay
};

const mapStateToProps = (state: RootState) => {
  return {
    gameHistoryItems: state.gamesHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesHistory);
