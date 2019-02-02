import * as React from 'react';

export interface TypingTestPageProps {}

export interface TypingTestPageState {}

export default class TypingTestPage extends React.Component<
  TypingTestPageProps,
  TypingTestPageState
> {
  constructor(props: TypingTestPageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>typing test</div>;
  }
}
