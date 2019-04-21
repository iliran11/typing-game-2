import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { BlockingAlert } from './BlockingAlert';
import { NotificationTypes } from '../../types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { TCNavigator } from 'src/middlewares/TCNavigations';

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
export const GlobalBlockingAlerts = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockingAlert);

const noNotificationObject = {
  open: false,
  title: '',
  dialogContentText: '',
  actions: null
};
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
    case NotificationTypes.GAME_TIMEOUT_NOTIFICATION:
      if (TCNavigator.getInstance().isGameUrl) {
        return {
          open: true,
          title: 'Game is Over',
          dialogContentText:
            'Game has timed out due. it should be faster than this :)',
          actions: <Button color="primary">Try Again!</Button>
        };
      } else {
        return noNotificationObject;
      }
    case NotificationTypes.SOCKET_DISCONNECT:
      return {
        open: true,
        title: 'We had a problem with your connection ...',
        dialogContentText:
          "Let's try to connect again and restart your game with another room",
        actions: <Button color="primary">Try to Reconnect</Button>
      };
    default:
      return noNotificationObject;
  }
}
