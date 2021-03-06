import * as React from 'react';
import 'src/css/components/range-bar.scss';

import { Arrow } from './Arrow';
import checkedIcon from 'src/assets/checked/checked.svg';

export interface RangeBarProps {
  initialValue: number;
  currentValue: number;
  barStartValue: number;
  barEndValue: number;
  duration: number;
  onCompletion: any;
}

export class RangeBar extends React.PureComponent<RangeBarProps, any> {
  arrowRef: any;
  rangebarRef: any;
  indicatorValueRef: any;
  checkedRef: any;
  rangeTravel: number;
  startTime: number;
  fractionDuration: number;
  arrowWidth: number;
  constructor(props: RangeBarProps) {
    super(props);
    this.startTime = -1;
    this.rangeTravel = -1;
    this.fractionDuration = -1;
    this.arrowWidth = -1;
    this.arrowRef = React.createRef();
    this.rangebarRef = React.createRef();
    this.indicatorValueRef = React.createRef();
    this.checkedRef = React.createRef();
    this.animate = this.animate.bind(this);
  }
  // gets the fraction of time that passed (0 at start, 1 at the end) and returns the animation completion.
  timing(timeFraction: number) {
    return timeFraction * this.rangeTravel;
  }
  indicatorTiming(timeFraction: number) {
    return this.props.initialValue + timeFraction * this.totalTravelRange;
  }
  // takes the animation completion state and draws it.
  // progress is the Y axis on the graph.
  draw(progress: any) {
    const offset = progress - this.arrowWidth;
    this.arrowRef.current.style.transform = `translateX(${offset}px)`;
  }
  valueDraw(progress: number) {
    this.indicatorValueRef.current.innerText = Math.floor(progress);
  }
  animate(timestamp: number) {
    if (this.startTime < 0) {
      this.startTime = timestamp;
    }
    let timeFraction = (timestamp - this.startTime) / this.fractionDuration;
    if (timeFraction > 1) timeFraction = 1;
    const arrowProgress = this.timing(timeFraction);
    const valueProgress = this.indicatorTiming(timeFraction);
    this.draw(arrowProgress);
    this.valueDraw(valueProgress);
    if (timeFraction < 1) {
      requestAnimationFrame(this.animate);
    } else {
      if (this.props.currentValue >= this.props.barEndValue) {
        this.checkedRef.current.classList.add('visible');
      }
      this.props.onCompletion();
    }
  }
  componentDidMount() {
    const {
      barStartValue,
      barEndValue,
      currentValue,
      initialValue
    } = this.props;
    const rangebarWidth = this.rangebarRef.current.offsetWidth;
    this.arrowWidth = this.arrowRef.current.offsetWidth / 2;
    const fractionPath = (currentValue - initialValue) / this.totalRange;
    this.rangeTravel = rangebarWidth * fractionPath;
    this.fractionDuration = this.props.duration * fractionPath;
    if (currentValue != initialValue) {
      window.setTimeout(() => {
        requestAnimationFrame(this.animate);
      }, 0);
    } else {
      this.props.onCompletion();
    }
  }
  get totalRange() {
    return this.props.barEndValue - this.props.barStartValue;
  }
  get totalTravelRange() {
    return this.props.currentValue - this.props.initialValue;
  }
  get arrowStyle() {
    const leftPercent =
      (this.props.initialValue - this.props.barStartValue) / this.totalRange;
    return {
      left: `${leftPercent * 100}%`
    };
  }
  get showChecked() {
    return this.props.initialValue >= this.props.barEndValue ? 'visible' : '';
  }
  public render() {
    return (
      <div className="rangebar-container">
        <span className="rangebar-label rangebar-label-left">
          {this.props.barStartValue}
        </span>
        <div className="rangebar" ref={this.rangebarRef}>
          <div
            className="rangebar-indicator-container"
            ref={this.arrowRef}
            style={this.arrowStyle}
          >
            <Arrow />
            <span className="rangebar-moving-result">
              <span ref={this.indicatorValueRef}>
                {this.props.initialValue}
              </span>
              <img
                className={`rangebar-checked-img ${this.showChecked}`}
                src={checkedIcon}
                ref={this.checkedRef}
              />
            </span>
          </div>
        </div>
        <span className="rangebar-label rangebar-label-right">
          {this.props.barEndValue}
        </span>
      </div>
    );
  }
}

// @ts-ignore
RangeBar.defaultProps = {
  duration: 4000
};
