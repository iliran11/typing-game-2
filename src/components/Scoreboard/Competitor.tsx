import * as React from 'react';
import './competitor.css';
import { EMPTY_COMPETITOR_SLOT } from '../../constants';
import Spinner from '../spinner/spinner';
import CircularProgress from '../CircularProgress';

// wpm of maximum progress in circular progress.
const maxWpmGauge = 40;

interface Props {
  name: string;
  score: number;
  compeletedPercntage: number;
  index: number;
}
interface State {
  hasMounted: boolean;
}

class Competitor extends React.PureComponent<Props, State> {
  progressBarRef: any;
  progressbarWidth: number;
  avatarRef: any;
  constructor(props: Props) {
    super(props);
    this.progressBarRef = React.createRef();
    this.avatarRef = React.createRef();
    this.state = {
      hasMounted: false
    };
  }
  componentDidMount() {
    this.setState({
      hasMounted: true
    });
  }
  get normalizedWpmScore() {
    if (this.props.score) {
      return Math.floor(this.props.score);
    }
    return 0;
  }
  get avatarStyle() {
    const transform = this.isEmptySlot
      ? this.avatarTransformEmptySlot
      : this.avatarTransformCompetitor;

    return {
      transform: `translateX(${transform}px)`
    };
  }
  // relevent only on the first paint, when we don't have the refs yet.
  get transformToEdge() {
    return window.innerWidth * 0.333 * -1;
  }
  //avatar will be called only after the component has mounted so we have access to all refs here. no need
  get avatarTransformCompetitor() {
    const visualOffset = 20;
    if (!this.progressBarRef.current) {
      return visualOffset;
    }
    // console.log(`bar width:${this.progressbarWidth}. percent:${this.props.compeletedPercntage}. result: ${this.props.compeletedPercntage * this.progressbarWidth}`)
    // a little visual addition to make it more appealing like.

    return (
      this.percentageCompleted * this.progressBarRef.current.clientWidth +
      visualOffset
    );
  }
  get avatarTransformEmptySlot() {
    return this.transformToEdge;
  }
  get percentageCompleted() {
    // if the game hasn't started and the complete percentage is not defined yet - return 0;
    return this.props.compeletedPercntage || 0;
  }
  get isEmptySlot() {
    return this.props.name === EMPTY_COMPETITOR_SLOT;
  }
  get nameSectionText() {
    return this.isEmptySlot ? 'Waiting ...' : this.props.name;
  }

  render() {
    // console.log(this.normalizedWpmScore,maxWpmGauge,this.normalizedWpmScore / maxWpmGauge);
    return (
      <div className="competitor-container">
        <div className="competitor-name-section">{this.nameSectionText}</div>
        <div className="competitor-progress">
          <div className="progress-bar" ref={this.progressBarRef} />
          <div
            className="avatar"
            style={this.avatarStyle}
            ref={this.avatarRef}
          />
          <div style={{ position: 'absolute', left: 30 }}>
            {this.isEmptySlot && <Spinner />}
          </div>
        </div>
        <div className="competitor-wpm">
          <div className="circular-progress">
            <CircularProgress
              percentage={this.normalizedWpmScore / maxWpmGauge} text={this.normalizedWpmScore}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Competitor;
