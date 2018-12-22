import { connect } from 'react-redux';
import GamesHistory from './GamesHistory';
import { fetchGamesHistory } from './redux/gamesHistoryActions';
import { RootState } from '../../types';

const mapDispatchToProps = {
  fetchGamesHistory
};

const mapStateToProps = (state: RootState) => {
  return {
    isFetching: state.gamesHistory.isFetched,
    gameHistoryItems: state.gamesHistory.gameHistories
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesHistory);
