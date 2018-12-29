import * as React from 'react';

export interface VideosProps {}

export interface VideosState {}

export default class Videos extends React.Component<VideosProps, VideosState> {
  constructor(props: VideosProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>Videos</div>;
  }
}
