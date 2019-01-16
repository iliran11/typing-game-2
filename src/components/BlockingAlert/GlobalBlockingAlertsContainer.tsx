import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { BlockingAlert } from './BlockingAlert';
import { NotificationTypes } from '../../types';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  logoutSpinner: {
    display: 'flex',
    justifyContent: 'center'
  }
};
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const notificationType = state.notificationsManager.notificationType;
  const alertProps = getAlertProps(notificationType);
  return {
    ...alertProps
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockingAlert);

function getAlertProps(notificationType: NotificationTypes) {
  switch (notificationType) {
    case NotificationTypes.LOGOUT_NOTIFICATION:
      return {
        open: true,
        title: 'Logging Out ...',
        dialogContentText: (
          <div style={styles.logoutSpinner}>
            <CircularProgress />
          </div>
        ),
        actions: null
      };
    default:
      return {
        open: false,
        title: '',
        dialogContentText: '',
        actions: null
      };
  }
}
