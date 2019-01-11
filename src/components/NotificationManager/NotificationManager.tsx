import * as React from 'react';
import {
  NotificationsReducerI,
  NotificationTypeEnum,
  NotificationSeverityEnum
} from '../../types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export interface NotificationManagerProps {
  notification: NotificationsReducerI;
}
export interface NotificationManagerState {
  isOpen: boolean;
}

export default class NotificationManager extends React.PureComponent<
  NotificationManagerProps,
  any
> {
  constructor(props: NotificationManagerProps) {
    super(props);
    this.state = {
      isOpen: true,
      notificationMessage: ''
    };
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidUpdate(prevProps: NotificationManagerProps) {
    if (this.props.notification !== prevProps.notification) {
      this.setState({
        isOpen: true,
        notificationMessage: this.props.notification.notificationMessage
      });
    }
  }
  handleClose() {
    this.setState({
      isOpen: false
    });
  }
  public render() {
    if (this.props.notification.notificationType === NotificationTypeEnum.NONE)
      return null;
    if (this.props.notification.notificationType === NotificationTypeEnum.toast)
      return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.isOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar">{this.state.notificationMessage}</span>
            }
          />
        </Snackbar>
      );
  }
}
