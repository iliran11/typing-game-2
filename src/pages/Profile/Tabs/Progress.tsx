import * as React from 'react';
import Chart from 'chart.js';

export interface ProgressProps {}

export interface ProgressState {}

export default class Progress extends React.Component<
  ProgressProps,
  ProgressState
> {
  myCanvas: any;
  constructor(props: ProgressProps) {
    super(props);
    this.myCanvas = React.createRef();
    this.state = {};
  }
  componentDidMount() {
    var myChart = new Chart(this.myCanvas.current, {
      type: 'line',
      data: {
        labels: ['jan','fab','march','april','may'],
        datasets: [
          {
            label: 'hello world',
            data: [1, 2, 3, 4, 50]
          }
        ]
      }
    });
  }
  public render() {
    return (
      <div style={{ padding: 50 }}>
        <canvas ref={this.myCanvas} width="100" height="100" />
      </div>
    );
  }
}
