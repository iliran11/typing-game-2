import * as React from 'react';
import { NotificationsReducerI } from '../../types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export interface NotificationManagerProps {
  toast: NotificationsReducerI;
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
      toastMessage: ''
    };
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidUpdate(prevProps: NotificationManagerProps) {
    if (this.props.toast !== prevProps.toast) {
      this.setState({
        isOpen: true,
        toastMessage: this.props.toast.toastMessage
      });
    }
  }
  handleClose() {
    this.setState({
      isOpen: false
    });
  }
  public render() {
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
          message={<span id="client-snackbar">{this.state.toastMessage}</span>}
        />
      </Snackbar>
    );
  }
}
