import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface SocketDisconnectProps {
  socketConnected: boolean;
}

export interface SocketDisconnectState {
  open: boolean;
}

export class SocketDisconnect extends React.Component<
  SocketDisconnectProps,
  SocketDisconnectState
> {
  constructor(props: SocketDisconnectProps) {
    super(props);
    this.state = {
      open: false
    };
    this.handleReconnect = this.handleReconnect.bind(this);
  }
  componentDidUpdate(prevProps: SocketDisconnectProps) {
    if (
      prevProps.socketConnected === true &&
      this.props.socketConnected === false
    ) {
      this.setState({
        open: true
      });
    }
  }
  handleReconnect() {
    this.setState({
      open: false
    });
    location.reload();
  }
  public render() {
    return (
      <div>
        <Dialog open={this.state.open}>
          <DialogTitle id="alert-dialog-title">
            {'We had a problem with your connection ...'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let's try to connect again and restart your game with another
              room.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleReconnect}>
              Try to Reconnect
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
