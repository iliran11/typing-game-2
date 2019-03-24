import { connect } from 'react-redux';
import Stats2Tab from './Stats2Tab';
import { RootState } from 'src/types/typesIndex';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const activeUser = state.authentication.playerId;
  const { userAchievments, authentication } = state;
  const { gameType, platform } = props;
  const { totalWins, totalGames } = userAchievments[activeUser][gameType][
    platform
  ];
  const highlights = state.highlights[activeUser][gameType][platform];
  return {
    totalWins,
    totalGames,
    highlights,
    bestGame: state.bestGame[activeUser]
  };
};
export const Stats2Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats2Tab);
