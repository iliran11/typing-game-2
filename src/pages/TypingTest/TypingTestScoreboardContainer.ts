import { connect } from 'react-redux';
import { TypingTestScoreboard } from '../../components/TypingTestScoreBoard/TypingTestScoreboard';
import { RootState } from '../../types/typesIndex';
import { ScoreboardSectionData } from '../../types/typesIndex';

const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  if (!props.roomId) return { data: [] };
  const accuracy = (state.typingTest[props.roomId].accuracy * 100).toFixed(0);
  const data: ScoreboardSectionData[] = [
    {
      value: Math.floor(state.typingTest[props.roomId].wpm),
      label: 'WORDS/MIN'
    },
    {
      value: Math.floor(state.typingTest[props.roomId].cpm),
      label: 'CHARS/MIN'
    },
    {
      value: `${accuracy}%`,
      label: 'ACCURACY'
    }
  ];
  return { data };
};
export const TypingTestScoreboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypingTestScoreboard);
