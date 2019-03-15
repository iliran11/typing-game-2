import * as React from 'react';
import Confetti from 'react-dom-confetti';
import { RangeBar, RangeBarProps } from 'src/components/ComponentsIndex';

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
  completedBars: number;
  constructor(props: AchievementsProgressPageProps) {
    super(props);
    this.state = {
      confetti: false
    };
    this.onBarCompletion = this.onBarCompletion.bind(this);
    this.completedBars = 0;
  }
  onBarCompletion() {
    this.completedBars++;
    if (this.completedBars === this.props.achievementsProgress.length) {
      this.setState({
        confetti: true
      });
    }
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
                onCompletion={this.onBarCompletion}
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
