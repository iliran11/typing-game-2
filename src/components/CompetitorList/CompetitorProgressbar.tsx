import * as React from 'react';

export interface IAppProps {
  percentageCompleted: number;
  progressBarRef: any;
}

export default class IApp extends React.PureComponent<IAppProps, any> {
  get completedProgressbarStyle() {
    return {
      width: `${this.props.percentageCompleted * 100}%`,
      backgroundColor: 'green'
    };
  }
  get undoneProgressbarStyle() {
    const undonePercentage = (1 - this.props.percentageCompleted) * 100;
    return {
      width: `${undonePercentage}%`,
      backgroundColor: 'black'
    };
  }
  public render() {
    return (
      <div className="progress-bar" ref={this.props.progressBarRef}>
        <div
          className="completed-progress-bar"
          style={this.completedProgressbarStyle}
        />
        <div
          className="undone-progress-bar"
          style={this.undoneProgressbarStyle}
        />
      </div>
    );
  }
}
