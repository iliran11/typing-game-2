import * as React from 'react';
import checked from '../../../../assets/checked2.svg';

export interface StatsProps {
  currentWpm: number;
  currentAccuracy: number;
  currentTotalWordsTyped: number;
  currentTotalTyped: number;
  targetWpm: number;
  targetAccuracy: number;
  targetTotalWordsTyped: number;
  targetCharsTyped: number;
}

export interface StatsState {}

export default class Stats extends React.Component<StatsProps, StatsState> {
  constructor(props: StatsProps) {
    super(props);

    this.state = {};
  }
  get currentStatsProps(): StatsListI {
    const {
      currentWpm,
      targetWpm,
      currentAccuracy,
      targetAccuracy,
      currentTotalWordsTyped,
      targetTotalWordsTyped,
      currentTotalTyped,
      targetCharsTyped
    } = this.props;
    return {
      wpm: {
        value: currentWpm,
        label: 'Word per minute: ',
        isCompleted: currentWpm > targetWpm
      },
      accuracy: {
        value: currentAccuracy,
        label: 'accuracy: ',
        isCompleted: currentAccuracy > targetAccuracy
      },
      totalWordsTyped: {
        value: currentTotalWordsTyped,
        label: 'Total words typed: ',
        isCompleted: currentTotalWordsTyped > targetTotalWordsTyped
      },
      totalChars: {
        value: currentTotalTyped,
        label: 'Total chars Typed: ',
        isCompleted: currentTotalTyped > targetCharsTyped
      }
    };
  }
  get targetStatsProps(): StatsListI {
    return {
      wpm: { value: this.props.targetWpm, label: 'Word per minute: ' },
      accuracy: { value: this.props.targetAccuracy, label: 'Accuracy: ' },
      totalWordsTyped: {
        value: this.props.targetTotalWordsTyped,
        label: 'Total words typed: '
      },
      totalChars: {
        value: this.props.targetCharsTyped,
        label: 'Total chars typed'
      }
    };
  }
  public render() {
    return (
      <div id="profile-stats">
        <div className="profile-stats-section">
          <div className="stats-section-header align-left">
            <h3>My Score</h3>
          </div>
          <StatsList {...this.currentStatsProps} />
        </div>
        <div className="profile-stats-section align-right">
          <div className="stats-section-header align-right">
            <h3>Next Level</h3>
          </div>
          <StatsList {...this.targetStatsProps} />
        </div>
      </div>
    );
  }
}
interface statsItemData {
  value: number;
  isCompleted?: boolean;
  label: string;
}
interface StatsListI {
  wpm: statsItemData;
  accuracy: statsItemData;
  totalWordsTyped: statsItemData;
  totalChars: statsItemData;
}

function StatsList(props: StatsListI) {
  return (
    <div className="stats-goals-list">
      <StatsItem
        label={props.wpm.label}
        value={Math.floor(props.wpm.value)}
        isCompleted={props.wpm.isCompleted}
      />
      <StatsItem
        label={props.accuracy.label}
        // @ts-ignore
        value={props.accuracy.value.toFixed(2)}
        isCompleted={props.accuracy.isCompleted}
      />
      <StatsItem
        label={props.totalWordsTyped.label}
        value={props.totalWordsTyped.value}
        isCompleted={props.totalWordsTyped.isCompleted}
      />
      <StatsItem
        label={props.totalChars.label}
        value={props.totalChars.value}
        isCompleted={props.totalChars.isCompleted}
      />
    </div>
  );
}

function StatsItem(props: statsItemData) {
  return (
    <div className="stats-list-item">
      <span>
        {props.label} {props.value}
      </span>
      {props.isCompleted && (
        <div className="list-item-completed">
          <img src={checked} className="checked" />
        </div>
      )}
    </div>
  );
}
