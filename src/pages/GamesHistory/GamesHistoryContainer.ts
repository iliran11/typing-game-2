import { connect } from 'react-redux';
import GamesHistory from './GamesHistory';
import { fetchGamesHistory } from './redux/gamesHistoryActions';
import { RootState } from '../../types';

const mapDispatchToProps = {
  fetchGamesHistory
};

const mapStateToProps = (state: RootState) => {
  const {
    gamesHistory: { isFetched, gameHistories }
  } = state;
  return {
    isFetched,
    gameHistoryItems: gameHistories
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesHistory);
