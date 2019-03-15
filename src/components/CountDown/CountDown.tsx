import * as React from 'react';

export interface State {
  currentStackIndex: number;
}

export interface Props {
  onTimerFinish: () => void;
}

export class CountDown extends React.Component<Props, State> {
  textStack: string[];
  intervalTimer: any;
  fadeoutTimer: any;

  constructor(props: Props) {
    super(props);
    this.textStack = ['5', '4', '3', '2', '1', 'GO'];
    this.state = {
      currentStackIndex: 0
    };
  }
  componentDidMount() {
    this.intervalTimer = setInterval(() => {
      this.setState({
        currentStackIndex: this.state.currentStackIndex + 1
      });
    }, 1000);
  }
  componentDidUpdate() {
    if (this.state.currentStackIndex === this.textStack.length - 1) {
      clearInterval(this.intervalTimer);
      setTimeout(() => {
        this.props.onTimerFinish();
      }, 1000);
    }
  }
  render() {
    return (
      <div id="count-down-mask">
        <div id="count-down" className="gradient-5">
          {this.textStack[this.state.currentStackIndex]}
        </div>
      </div>
    );
  }
}
