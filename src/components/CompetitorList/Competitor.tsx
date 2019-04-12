import * as React from 'react';
import 'src/css/components/competitor.scss';
import { EMPTY_COMPETITOR_SLOT, MAX_WPM_GAUGE } from 'src/constants';
import { PlayerType, PlayerAvatar } from 'src/types';
import checkedIcon from 'src/assets/checked/checked.svg';
import {
  Spinner,
  CircularProgress,
  Avatar,
  BreakdownName
} from 'src/components/ComponentsIndex';
import CompetitorProgressbar from './CompetitorProgressbar';
// wpm of maximum progress in circular progress.
const maxWpmGauge = 80;

interface Props {
  id: string;
  wpm: number;
  // compeletedPercntage: number;
  completedPercentage: number;
  index: number;
  playerAvatar: PlayerAvatar;
  isMe: boolean;
  type: PlayerType;
  hasLeft: boolean;
  isFinished: boolean;
  navigateToResult: () => void;
  name: string;
}
interface State {
  hasMounted: boolean;
  isFinished: boolean;
}

class Competitor extends React.PureComponent<Props, State> {
  progressBarRef: any;
  progressbarWidth: number = 0;
  constructor(props: Props) {
    super(props);
    this.progressBarRef = React.createRef();
    this.state = {
      hasMounted: false,
      isFinished: false
    };
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
  }
  componentDidMount() {
    this.setState({
      hasMounted: true
    });
  }
  get normalizedWpmScore() {
    if (this.props.wpm) {
      return Math.floor(this.props.wpm);
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
    // console.log(`bar width:${this.progressbarWidth}. percent:${this.props.completedPercentage}. result: ${this.props.compeletedPercntage * this.progressbarWidth}`)
    // a little visual addition to make it more appealing like.

    return this.percentageCompleted * this.progressBarRef.current.clientWidth;
  }
  get avatarTransformEmptySlot() {
    return this.transformToEdge;
  }
  get percentageCompleted() {
    // if the game hasn't started and the complete percentage is not defined yet - return 0;
    return this.props.completedPercentage || 0;
  }
  get isEmptySlot() {
    return this.props.id === EMPTY_COMPETITOR_SLOT;
  }
  get nameSectionText() {
    return this.isEmptySlot ? 'Waiting ...' : this.props.name;
  }
  // extract the number from the guest. temporary method.
  get guestNumber() {
    return this.nameSectionText.split(' ')[1];
  }
  get name(): string {
    return this.props.isMe ? 'YOU' : this.nameSectionText;
  }
  get competitorStyle() {
    return {
      opacity: this.props.hasLeft ? 0.2 : 1
    };
  }
  get competitorClassNames() {
    return `competitor-container ${this.props.isMe ? 'gradient-8' : ''} ${
      this.state.isFinished ? 'finish-shake' : ''
    }`;
  }
  onTransitionEnd() {
    if (this.percentageCompleted === 1) {
      if (this.props.isMe) {
        setTimeout(this.props.navigateToResult, 1500);
      }
      this.setState({
        isFinished: true
      });
    }
  }
  renderAvatar() {
    return (
      <div className="avatar" style={this.avatarStyle}>
        <Avatar url={this.props.playerAvatar.url} />
        {this.state.isFinished && (
          <img className="completed-icon" src={checkedIcon} />
        )}
      </div>
    );
  }
  render() {
    return (
      <div
        className={this.competitorClassNames}
        style={this.competitorStyle}
        onTransitionEnd={this.onTransitionEnd}
      >
        <div className="competitor-name-section">
          {this.props.name && <BreakdownName name={this.props.name} />}
        </div>
        <div className="competitor-progress">
          <CompetitorProgressbar
            percentageCompleted={this.percentageCompleted}
            progressBarRef={this.progressBarRef}
          />
          {this.props.playerAvatar && this.renderAvatar()}

          <div style={{ position: 'absolute', left: 30 }}>
            {this.isEmptySlot && <Spinner />}
          </div>
        </div>
        <div className="competitor-wpm">
          <div className="circular-progress">
            <CircularProgress
              percentage={this.normalizedWpmScore / MAX_WPM_GAUGE}
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
