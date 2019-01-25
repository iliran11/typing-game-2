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
      <div style={{ height: 400, width: '50%', marginTop: 20 }}>
        <AchievementsStats />
      </div>
    );
  }
}
