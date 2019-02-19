import { connect } from 'react-redux';
import { TypingTestScoreboard } from '../../components/TypingTestScoreBoard/TypingTestScoreboard';
import { RootState } from '../../types/typesIndex';
import { ScoreboardSectionData } from '../../types/typesIndex';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const accuracy = (state.typingTest.accuracy * 100).toFixed(0);
  const data: ScoreboardSectionData[] = [
    {
      value: Math.floor(state.typingTest.wpm),
      label: 'WORDS/MIN'
    },
    {
      value: Math.floor(state.typingTest.cpm),
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
