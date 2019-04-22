import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { BlockingAlert } from './BlockingAlert';
import { NotificationTypes } from '../../types';
import { TCButton } from 'src/components/ComponentsIndex';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { TCNavigator } from 'src/middlewares/TCNavigations';
import { Store } from 'src/middlewares/Store';
import { SHOW_NOTIFICATION, RESET_ACTIVE_ROOM } from 'src/constants';
import { SocketManager } from 'src/middlewares/socketManager';
import clock from 'src/assets/clock/clock.svg';
import 'src/css/components/notifications.scss';

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
    case NotificationTypes.GAME_TIMEOUT_NOTIFICATION: {
      const tryAgain = () => {
        const store = Store.store;
        store.dispatch({
          type: RESET_ACTIVE_ROOM
        });
        SocketManager.getInstance().reconnect();
        // TCNavigator.getInstance().navigateToMultiplayer();
        store.dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            notificationType: NotificationTypes.NONE
          }
        });
      };
      const toHome = () => {
        const store = Store.store;
        TCNavigator.getInstance().navigateHome();
        store.dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            notificationType: NotificationTypes.NONE
          }
        });
      };
      if (TCNavigator.getInstance().isGameUrl) {
        return {
          open: true,
          title: (
            <div className="timeout-notification">
              <img src={clock} />
              <span>&nbsp;</span>
              <span className="color-1">Game is Over</span>
            </div>
          ),
          dialogContentText: (
            <span className="color-3">
              The game is over, you can start a new game.
            </span>
          ),
          actions: (
            <div className="timeout-actions">
              <TCButton onClick={tryAgain}>Try Again!</TCButton>
              <TCButton onClick={toHome}>Back Home!</TCButton>
            </div>
          )
        };
      } else {
        return noNotificationObject;
      }
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
