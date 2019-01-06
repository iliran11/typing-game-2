import { connect } from 'react-redux';
import { RootState } from '../../types';
import NotificationsManager from './NotificationManager';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  return {
    toast: state.notificationsManager
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsManager);
