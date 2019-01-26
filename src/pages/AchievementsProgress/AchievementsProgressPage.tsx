import * as React from 'react';
import { AchievementsStats } from '../../components/AchievementStats/AchievementsStats';
import { AchievementsProgressI } from '../../types/AchievementsTypes';
import { RangeBar, RangeBarProps } from '../../components/RangeBar/RangeBar';
import Confetti from 'react-dom-confetti';

export interface AchievementsProgressPageProps {
  roomId: string;
  achievementsProgress: ProgressSectionI[];
}
export interface ProgressSectionI extends RangeBarProps {
  title: string;
}
interface AchievementsProgressPageState {
  confetti: boolean;
}

const config = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 50,
  decay: 0.9
};

export default class AchievementsProgressPage extends React.Component<
  AchievementsProgressPageProps,
  AchievementsProgressPageState
> {
  constructor(props: AchievementsProgressPageProps) {
    super(props);
    this.state = {
      confetti: false
    };
  }
  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ confetti: true });
    }, 2000);
  }
  public render() {
    return (
      <div className="page" style={{ marginTop: 20 }}>
        {this.props.achievementsProgress.map(progress => {
          const {
            initialValue,
            currentValue,
            barStartValue,
            barEndValue,
            duration
          } = progress;
          return (
            <div>
              <h5>{progress.title}</h5>
              <RangeBar
                initialValue={Math.min(initialValue, barEndValue)}
                currentValue={Math.min(currentValue, barEndValue)}
                barStartValue={barStartValue}
                barEndValue={barEndValue}
                duration={duration}
              />
            </div>
          );
        })}
        <div className="conffeti-container">
          <Confetti active={this.state.confetti} config={config} />
        </div>
      </div>
    );
  }
}
