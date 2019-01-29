import * as React from 'react';
import AuthenticationManager from '../../AuthenticationManager';

export interface RenderLessInitiatorProps {
  initSocketManager: any;
  initAuthenticationManager: any;
  history: any;
}

export default class RenderLessInitiator extends React.Component<
  RenderLessInitiatorProps,
  any
> {
  constructor(props: RenderLessInitiatorProps) {
    super(props);
    props.initSocketManager(props.history);
    const authenticationManager = props.initAuthenticationManager();
    authenticationManager.initialAuthentication();
  }
  public render() {
    return <React.Fragment />;
  }
}
