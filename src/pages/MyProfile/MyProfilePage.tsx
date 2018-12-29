import * as React from 'react';
import './myProfilePage.scss';

export interface MyProfileProps {
  fullName: string;
}

export default class MyProfile extends React.Component<MyProfileProps, any> {
  public render() {
    return (
      <div id="my-profile">
        <h1>{this.props.fullName}</h1>
        <div id="progress-summary" />
      </div>
    );
  }
}
