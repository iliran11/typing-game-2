import * as React from 'react';
import avatarPlaceholder from '../../assets/placeholder/avatarPlaceholder.svg';
import cx from 'classnames';
export interface ActiveUserAvatarProps {
  picture: string | undefined;
  onClick: () => void;
  className: string;
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
          <img
            src={avatarPlaceholder}
            onClick={this.props.onClick}
            className={cx('toolbar-avatar')}
          />
        )}
        <img
          className={cx('toolbar-avatar', this.props.className, {
            hidden: !this.state.isPictureLoaded
          })}
          src={this.props.picture}
          onClick={this.props.onClick}
          onLoad={this.onPictureload}
        />
      </React.Fragment>
    );
  }
}
