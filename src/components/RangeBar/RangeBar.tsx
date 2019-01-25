import * as React from 'react';
import './RangeBar.scss';
import {Arrow} from './Arrow'

// var start;
// function repeatOften(timestamp) {
// if(!start) start= Date.now();
  
// console.log(timestamp - start)// Do whatever
// start = timestamp
//   requestAnimationFrame(repeatOften);
// }
// requestAnimationFrame(repeatOften);





export interface RangeBarProps {
}

export class RangeBar extends React.PureComponent<RangeBarProps, any> {
  public render() {
    return (
      <div className="rangebar-container">
      {/* <span>WPM</span> */}
      <div className="rangebar-indicator-container">
        <Arrow />
        <span>16</span>
      </div>
      <span>30</span>
    </div>
    );
  }
}

