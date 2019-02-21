import { connect } from 'react-redux';
import { TypingTestScoreboard } from '../../components/TypingTestScoreBoard/TypingTestScoreboard';
import { RootState } from '../../types/typesIndex';
import { getTypingTestScoreboardData } from '../../utilities';

const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  if (!props.roomId) return { data: [] };
  const data = getTypingTestScoreboardData(state.typingTest[props.roomId]);
  return { data };
};
export const TypingTestScoreboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypingTestScoreboard);
