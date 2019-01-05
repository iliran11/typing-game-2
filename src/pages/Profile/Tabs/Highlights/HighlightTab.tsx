import * as React from 'react';

export interface VideosProps {
  fetchHighlights: any;
}

export interface VideosState {}

export default class Videos extends React.Component<VideosProps, VideosState> {
  constructor(props: VideosProps) {
    super(props);
    this.state = {};
    props.fetchHighlights();
  }

  public render() {
    return <div>Videos</div>;
  }
}
