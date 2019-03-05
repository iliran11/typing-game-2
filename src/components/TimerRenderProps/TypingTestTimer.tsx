import * as React from 'react';

export interface TypingTestTimerProps {
  isActive: boolean;
  render: any;
}

export interface TypingTestTimerState {
  timePassed: number;
}

export class TypingTestTimer extends React.Component<
  TypingTestTimerProps,
  TypingTestTimerState
> {
  intervalTimer: any;
  startTime: number;
  constructor(props: TypingTestTimerProps) {
    super(props);
    this.startTime = -1;
    this.intervalTimer = -1;
    this.state = {
      timePassed: 0
    };
    this.activateTimer = this.activateTimer.bind(this);
    if (props.isActive) {
      this.activateTimer();
    }
  }
  componentDidUpdate(prevProps: TypingTestTimerProps) {
    if (prevProps.isActive === false && this.props.isActive) {
      this.activateTimer();
    }
  }
  get timePassSeconds(): number {
    return Math.floor(this.state.timePassed / 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }
  activateTimer() {
    this.startTime = Date.now();
    this.intervalTimer = setInterval(() => {
      this.setState({
        timePassed: Date.now() - this.startTime
      });
    }, 1000);
  }
  public render() {
    return this.props.render(this.timePassSeconds);
  }
}
