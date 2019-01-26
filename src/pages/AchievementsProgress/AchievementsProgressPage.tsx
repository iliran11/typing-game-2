import * as React from 'react';
import { AchievementsStats } from '../../components/AchievementStats/AchievementsStats';

export interface AchievementsProgressPageProps {
  roomId: string;
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
