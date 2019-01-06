import { connect } from 'react-redux';
import SetupLevelPanel from './SetupLevelPanel';
import { updateCustomLevel } from '../../../../store/profileActions';

const mapDispatchToProps = { updateCustomLevel };

export default connect(
  null,
  mapDispatchToProps
)(SetupLevelPanel);
