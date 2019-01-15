import * as React from 'react';
import { HighlightItem } from './HighlightItem';
import { HighlightsI, HightLightItemI } from '../../../../types';
import { format } from 'date-fns';

export interface HighlightsListProps {
  highlights: HighlightsI;
  onItemClick: any;
}

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

export function HighlightsList(props: HighlightsListProps) {
  console.log(props.highlights);
  return (
    <div id="highlights-list">
      <div className="highlights-list-container">
        {props.highlights.highestSpeed && (
          <HighlightItem
            {...processHighestSpeed(props.highlights.highestSpeed)}
            onClick={props.onItemClick}
          />
        )}
        {props.highlights.firstPlace && (
          <HighlightItem
            {...processFirstPlace(props.highlights.firstPlace)}
            onClick={props.onItemClick}
          />
        )}
        {props.highlights.fastestGame && (
          <HighlightItem
            {...processTypedTheMost(props.highlights.fastestGame)}
            onClick={props.onItemClick}
          />
        )}
      </div>
    </div>
  );
}
function processHighestSpeed(item: HightLightItemI) {
  const firstRow = `Your highest speed: ${Math.floor(item.data.score)}Wpm`;
  const secondRow = `You took ${numberSuffix(item.data.rankAtFinish)} place`;
  // @ts-ignore
  const thirdRow = `Typed ${item.data.numberOfWords} in ${Math.floor(
    // @ts-ignore
    item.data.gameDuration / 1000
  )} secs`;
  // @ts-ignore
  const createdDate = format(item.data.finishedTimeStamp);
  return {
    firstRow,
    secondRow,
    thirdRow,
    createdDate,
    roomId: item.data.roomId
  };
}

function processFirstPlace(item: HightLightItemI) {
  const firstRow = `You took the ${numberSuffix(item.data.rankAtFinish)} place`;
  const secondRow = `Your speed: ${Math.floor(item.data.score)} WPM`;
  // @ts-ignore
  const thirdRow = `Typed ${item.data.numberOfWords} in ${Math.floor(
    // @ts-ignore
    item.data.gameDuration / 1000
  )}secs`;
  const createdDate = 'Invalid Date';
  return {
    firstRow,
    secondRow,
    thirdRow,
    createdDate,
    roomId: item.data.roomId
  };
}
function processTypedTheMost(item: HightLightItemI) {
  const firstRow = `You typed ${item.data.numberOfWords} in ${Math.floor(
    // @ts-ignore
    item.data.gameDuration / 1000
  )} Seconds`;
  const secondRow = `Your Speed: ${Math.floor(item.data.score)} WPM`;
  const thirdRow = `You took ${numberSuffix(item.data.rankAtFinish)} Place`;
  const createdDate = `Invalid Date`;
  return {
    firstRow,
    secondRow,
    thirdRow,
    createdDate,
    roomId: item.data.roomId
  };
}

// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function numberSuffix(i: any) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}
