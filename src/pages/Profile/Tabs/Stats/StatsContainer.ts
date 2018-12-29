import { connect } from 'react-redux';
import Stats from './Stats';
const mapDispatchToProps = {};
const mapStateToProps = (state: any, props: any) => {
  return {
    currentWpm: 42,
    currentAccuracy: 0.54,
    currentTotalWordsTyped: 160,
    currentTotalTyped: 426,
    targetWpm: 60,
    targetAccuracy: 0.8,
    targetTotalWordsTyped: 140,
    totalCharsTyped: 326
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);
