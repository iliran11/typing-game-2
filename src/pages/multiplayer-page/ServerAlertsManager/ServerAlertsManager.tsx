import React, { Fragment } from 'react';
import { BlockingAlert } from '../../../components/BlockingAlert/BlockingAlert';
import Button from '@material-ui/core/Button';

export interface ServerAlertsManagerProps {
  isSocketConnected: boolean;
  gameHasTimeout: boolean;
}

export interface ServerAlertsManagerState {}

export default class ServerAlertsManager extends React.Component<
  ServerAlertsManagerProps,
  ServerAlertsManagerState
> {
  constructor(props: ServerAlertsManagerProps) {
    super(props);

    this.state = {};
  }
  // show disconnect modal if there is no socket and there is no timeout.
  get isSocketDisconnectIsOpen(): boolean {
    return (
      this.props.isSocketConnected === false &&
      this.props.gameHasTimeout === false
    );
  }
  // show this modal anyway if there is a timeout message from server;
  get isGameTimedoutIsOpen(): boolean {
    return this.props.gameHasTimeout;
  }
  get gameHasTimedout() {
    return {
      title: 'Game is Over',
      dialogContentText:
        'Game has timed out due. it should be faster than this :)',
      actions: <Button color="primary">Try Again!</Button>
    };
  }
  get socketDisconnectProps() {
    return {
      title: 'We had a problem with your connection ...',
      dialogContentText:
        "Let's try to connect again and restart your game with another room",
      actions: <Button color="primary">Try to Reconnect</Button>
    };
  }
  public render() {
    return (
      <Fragment>
        <BlockingAlert
          {...this.socketDisconnectProps}
          open={this.isSocketDisconnectIsOpen}
        />
        <BlockingAlert
          {...this.gameHasTimedout}
          open={this.isGameTimedoutIsOpen}
        />
      </Fragment>
    );
  }
}
