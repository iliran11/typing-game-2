import { connect } from 'react-redux';
import { RootState } from '../../../../types';
import Highlights from './HighlightManager';
import { fetchHighlights } from '../../../../store/profileActions';
const mapDispatchToProps = { fetchHighlights };
const mapStateToProps = (state: RootState, props: any) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Highlights);
