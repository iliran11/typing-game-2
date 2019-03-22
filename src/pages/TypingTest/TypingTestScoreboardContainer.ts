import { connect } from 'react-redux';
import { ScoreSections } from 'src/components/ComponentsIndex';
import { RootState } from 'src/types/typesIndex';
import { getTypingTestScoreboardData } from 'src/utilities';

const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const data = getTypingTestScoreboardData(state.typingTest[props.roomId]);
  return { data };
};
export const TypingTestScoreboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreSections);
