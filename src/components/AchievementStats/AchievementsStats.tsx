import * as React from 'react';
import { RangeBar } from '../RangeBar/RangeBar';

export interface AchievementsStatsProps {}

export function AchievementsStats(props: AchievementsStatsProps) {
  return (
    <div className="list-of-rangebars">
      {/* <h5>0-70</h5> */}
      <RangeBar
        initialValue={0}
        currentValue={70}
        barStartValue={0}
        barEndValue={70}
        duration={5000}
      />
      {/* <h5>200-300</h5> */}
      <RangeBar
        initialValue={220}
        currentValue={290}
        barStartValue={200}
        barEndValue={300}
        duration={5000}
      />
      {/* <h5>1000-1500</h5> */}
      <RangeBar
        initialValue={1230}
        currentValue={1300}
        barStartValue={1000}
        barEndValue={1500}
        duration={5000}
      />
      {/* <h5>0-10</h5> */}
      <RangeBar
        initialValue={0}
        currentValue={8}
        barStartValue={0}
        barEndValue={10}
        duration={5000}
      />
    </div>
  );
}
