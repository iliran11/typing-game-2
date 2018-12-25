import { connect } from 'react-redux';
import ReplayPage from './ReplayPage';
const queryString = require('query-string');
import { fetchReplay } from '../../store/gameAction';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState, ownProps: any) => {
  const roomId = queryString.parse(ownProps.location.search).roomId;
  return {};
};

const mapDispatchToProps = {
  fetchReplay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplayPage);
