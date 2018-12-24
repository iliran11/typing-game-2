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
