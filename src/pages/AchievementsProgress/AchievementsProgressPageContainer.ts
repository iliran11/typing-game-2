import { connect } from 'react-redux';
import AchievementProgress from './AchievementsProgressPage';
const mapDispatchToProps = {};
const mapStateToProps = (state: any, props: any) => {
  return {};
};
export const AchievementProgressPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AchievementProgress);
