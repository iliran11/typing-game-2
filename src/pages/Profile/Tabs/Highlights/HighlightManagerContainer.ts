import { connect } from 'react-redux';
import { RootState } from '../../../../types';
import HighlightManager from './HighlightManager';
import { fetchHighlights } from '../../../../store/profileActions';
const mapDispatchToProps = { fetchHighlights };
const mapStateToProps = (state: RootState, props: any) => {
  const playerId = state.authentication.playerId;
  return {
    highlights: state.highlights[playerId]
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighlightManager);
