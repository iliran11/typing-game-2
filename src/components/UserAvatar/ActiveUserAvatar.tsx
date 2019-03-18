import * as React from 'react';
import avatarPlaceholder from '../../assets/placeholder/avatarPlaceholder.svg';

export interface ActiveUserAvatarProps {
  picture: string | undefined;
  onClick: () => void;
}

export interface ActiveUserAvatarState {
  isPictureLoaded: boolean;
}

export default class ActiveUserAvatar extends React.Component<
  ActiveUserAvatarProps,
  ActiveUserAvatarState
> {
  constructor(props: ActiveUserAvatarProps) {
    super(props);

    this.state = {
      isPictureLoaded: false
    };
    this.onPictureload = this.onPictureload.bind(this);
    this.imageStyle = this.imageStyle.bind(this);
  }
  onPictureload() {
    this.setState({
      isPictureLoaded: true
    });
  }
  imageStyle() {
    return {
      // display: this.state.isPictureLoaded ? 'block' : 'none'
      display: 'none'
    };
  }
  public render() {
    return (
      <React.Fragment>
        {this.state.isPictureLoaded === false && (
          <img src={avatarPlaceholder} onClick={this.props.onClick} />
        )}
        <img
          className={`active-user-avatar ${
            this.state.isPictureLoaded ? '' : 'hidden'
          }`}
          src={this.props.picture}
          onClick={this.props.onClick}
          onLoad={this.onPictureload}
        />
      </React.Fragment>
    );
  }
}
