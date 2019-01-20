import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import infoMenu from '../baseline-info-24px.svg';
import DebugInfo from './DebugInfoContainer';
export interface Props {
  children?: React.ReactNode;
}

export interface State {
  open: boolean;
}

export default class DebugDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick() {
    this.setState({
      open: true
    });
  }
  handleClose() {
    this.setState({
      open: false
    });
  }
  render() {
    return (
      <React.Fragment>
        <img src={infoMenu} onClick={this.handleClick} className="toolbar-icons" />
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DebugInfo />
        </Dialog>
      </React.Fragment>
    );
  }
}
