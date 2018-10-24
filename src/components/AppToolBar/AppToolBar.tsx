import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import DebugDialog from './DebugDialog/DebugDialog';

export interface Props {}

export interface State {}

export default class AppToolBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isDebugOpen: false
    };
  }
  handleDebug() {
    this.setState({
      isDebugOpen: true
    });
  }
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <DebugDialog />
            <Typography variant="h6" color="inherit">
              Typing Coacher.
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
