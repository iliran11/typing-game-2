import * as React from 'react';
import { AchievementsStats } from '../../components/AchievementStats/AchievementsStats';
import { AchievementsProgressI } from '../../types/AchievementsTypes';
import { RangeBar, RangeBarProps } from '../../components/RangeBar/RangeBar';

export interface AchievementsProgressPageProps {
  roomId: string;
  achievementsProgress: RangeBarProps[];
}

export default class AchievementsProgressPage extends React.Component<
  AchievementsProgressPageProps,
  any
> {
  public render() {
    return (
      <div className="page" style={{ marginTop: 20 }}>
        <AchievementsStats />
      </div>
    );
  }
}
