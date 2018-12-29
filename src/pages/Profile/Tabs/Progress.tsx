import * as React from 'react';

export interface ProgressProps {}

export interface ProgressState {}

export default class Progress extends React.Component<
  ProgressProps,
  ProgressState
> {
  constructor(props: ProgressProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>progress</div>;
  }
}
