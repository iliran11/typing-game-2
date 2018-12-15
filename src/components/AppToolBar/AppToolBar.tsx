import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import DebugDialog from './DebugDialog/DebugDialog';

export default class AppToolBar extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isDebugOpen: false
    };
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }
  handleDebug() {
    this.setState({
      isDebugOpen: true
    });
  }
  navigateToProfile() {
    this.props.history.push('/my-profile');
  }
  render() {
    console.log(this.props.picture);
    return (
      <div id="app-toolbar">
        <AppBar position="static" color="default">
          <Toolbar>
            <DebugDialog />
            <div id="toolbar-layout">
              <Typography variant="h6" color="inherit">
                Typing Coacher
              </Typography>
              {this.props.picture && (
                <img src={this.props.picture} onClick={this.navigateToProfile} />
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
