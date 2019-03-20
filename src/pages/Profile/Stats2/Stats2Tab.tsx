import * as React from 'react';

export interface Stats2TabProps {}

export interface Stats2TabState {}

export default class Stats2Tab extends React.Component<
  Stats2TabProps,
  Stats2TabState
> {
  constructor(props: Stats2TabProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>stats2 tab</div>;
  }
}
