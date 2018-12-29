import * as React from 'react';

export interface StatsProps {}

export interface StatsState {}

export default class Stats extends React.Component<StatsProps, StatsState> {
  constructor(props: StatsProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>Stats</div>;
  }
}
