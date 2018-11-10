import * as React from 'react';
import './competitor.css';
import { EMPTY_COMPETITOR_SLOT } from '../../constants';
import Spinner from '../spinner/spinner';
import CircularProgress from '../CircularProgress';
import Avatar from './Avatar'
import {PlayerType} from '../../types'

// wpm of maximum progress in circular progress.
const maxWpmGauge = 80;

interface Props {
  name: string;
  score: number;
  compeletedPercntage: number;
  index: number;
  randomAvatarIndex: number;
  isMe: boolean;
  type: PlayerType
  isActive:boolean
}
interface State {
  hasMounted: boolean;
}

class Competitor extends React.PureComponent<Props, State> {
  progressBarRef: any;
  progressbarWidth: number;
  constructor(props: Props) {
    super(props);
    this.progressBarRef = React.createRef();
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
  // avatar will be called only after the component has mounted so we have access to all refs here. no need
  get avatarTransformCompetitor() {
    const visualOffset = 0;
    if (!this.progressBarRef.current) {
      return visualOffset;
    }
    // console.log(`bar width:${this.progressbarWidth}. percent:${this.props.compeletedPercntage}. result: ${this.props.compeletedPercntage * this.progressbarWidth}`)
    // a little visual addition to make it more appealing like.
    return (
      this.percentageCompleted * this.progressBarRef.current.clientWidth
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
  // extract the number from the guest. temporary method.
  get guestNumber() {
    return this.nameSectionText.split(' ')[1];
  }
  get name() :string {
    return this.props.isMe? 'YOU' : this.nameSectionText
  }
  get competitorStyle() {
    if(this.props.isActive===false) {
      return {
        opacity: 0.2
      }
    }
    return {}
  }

  render() {
    // console.log(this.normalizedWpmScore,maxWpmGauge,this.normalizedWpmScore / maxWpmGauge);
    return (
      <div className={`competitor-container ${this.props.isMe ? 'gradient-8' : ''}`} style={this.competitorStyle}>
        <div className="competitor-name-section">
          <span>{this.name}</span>
        </div>
        <div className="competitor-progress">
          <div className="progress-bar shadow-4dp" ref={this.progressBarRef} />
          <div className="avatar"  style={this.avatarStyle}>
          <Avatar type={this.props.type} index={this.props.randomAvatarIndex}/>
          </div>
          <div style={{ position: 'absolute', left: 30 }}>
            {this.isEmptySlot && <Spinner />}
          </div>
        </div>
        <div className="competitor-wpm">
          <div className="circular-progress">
            <CircularProgress
              percentage={this.normalizedWpmScore / maxWpmGauge}
              text={this.normalizedWpmScore}
            />
          </div>
          <span className="wpm-label">WPM</span>
        </div>
      </div>
    );
  }
}

export default Competitor;
