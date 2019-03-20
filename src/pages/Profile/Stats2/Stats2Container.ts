import { connect } from 'react-redux';
import Stats2Tab from './Stats2Tab';
import { RootState } from 'src/types/typesIndex';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const activeUser = state.authentication.playerId;
  const { totalWins, totalGames } = state.userAchievments[activeUser];
  return {
    totalWins,
    totalGames
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats2Tab);
