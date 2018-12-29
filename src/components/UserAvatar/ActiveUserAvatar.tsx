import * as React from 'react';

export interface UserAvatarProps {
  picture: string | undefined;
  onClick: () => void;
}

export default class UserAvatar extends React.Component<UserAvatarProps, any> {
  public render() {
    return <img src={this.props.picture} onClick={this.props.onClick} />;
  }
}
