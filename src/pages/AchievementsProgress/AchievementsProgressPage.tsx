import * as React from 'react';
import { AchievementsStats } from '../../components/AchievementStats/AchievementsStats';
import { AchievementsProgressI } from '../../types/AchievementsTypes';
import { RangeBar, RangeBarProps } from '../../components/RangeBar/RangeBar';

export interface AchievementsProgressPageProps {
  roomId: string;
  achievementsProgress: ProgressSectionI[];
}
export interface ProgressSectionI extends RangeBarProps {
  title: string;
}

export default class AchievementsProgressPage extends React.Component<
  AchievementsProgressPageProps,
  any
> {
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
      </div>
    );
  }
}
