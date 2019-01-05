import * as React from 'react';
import { HighlightItem } from './HighlightItem';

export interface HighlightsTabProps {}

const data = [
  {
    firstRow: 'Your highest speed: 61 WPM',
    secondRow: 'You took 1st place',
    thirdRow: 'Typed 41 words in 3 miutes',
    createdDate: '14 nov, 12:05'
  },
  {
    firstRow: 'You took the 1st place',
    secondRow: 'the hightest speed: 32wpm',
    thirdRow: 'Typed 21 words in 2m',
    createdDate: '12 nov,07:12'
  },
  {
    firstRow: 'You typed 131 words in 4 minutes',
    secondRow: 'the highest speed: 58 wpm',
    thirdRow: 'you took 2st place',
    createdDate: '11 nov,08:05'
  }
];

export function HighlightsTab(props: HighlightsTabProps) {
  return (
    <React.Fragment>
      <h3>We collected some highlights from your history</h3>
      <div className="highlights-list-container">
        {data.map(dataItem => {
          return <HighlightItem {...dataItem} />;
        })}
      </div>
    </React.Fragment>
  );
}
