import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface BlockingAlertProps {
  open: boolean;
  title: string;
  dialogContentText: string;
  actions: any;
}

export class BlockingAlert extends React.Component<BlockingAlertProps, any> {
  constructor(props: BlockingAlertProps) {
    super(props);
    this.handleReconnect = this.handleReconnect.bind(this);
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
        <Dialog open={this.props.open}>
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.dialogContentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>{this.props.actions}</DialogActions>
        </Dialog>
      </div>
    );
  }
}
