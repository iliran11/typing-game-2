import React from 'react';
import { GameLevel } from '../../../../types';

export interface LevelConfigI {
  value: GameLevel;
  label: string;
  example: JSX.Element;
}

export const levelConfig: LevelConfigI[] = [
  {
    value: GameLevel.LEVEL1,
    label: 'Level 1',
    example: (
      <p>
        people who succeed have momentum the more they succeed the more they
        want to succeed the more they find a way to succeed
      </p>
    )
  },
  {
    value: GameLevel.LEVEL2,
    label: 'Level 2',
    example: (
      <p>
        <span className="green bold">P</span>eople who succeed have momentum{' '}
        <span className="green bold">T</span>he more they succeed the more they
        want to succeed the more they find a way to succeed
      </p>
    )
  },
  {
    value: GameLevel.LEVEL3,
    label: 'Level 3',
    example: (
      <p>
        <span className="green bold">P</span>eople who succeed have momentum
        <span className="green bold">. T</span>he more they succeed
        <span className="green bold">,</span> the more they want to succeed, the
        more they find a way to succeed<span className="green bold">.</span>
      </p>
    )
  },
  {
    value: GameLevel.LEVEL4,
    label: 'Level 4',
    example: (
      <p>
        <span className="green bold">21 P</span>eople who succeed have momentum
        <span className="green bold"> . T</span>he more they succeed, the more
        they want to succeed<span className="green bold">,</span> the more they
        find a way to succeed<span className="green bold">.</span>
      </p>
    )
  },
  {
    value: GameLevel.LEVEL5,
    label: 'Level 5',
    example: (
      <p>
        <span className="green bold">21 P</span>eople who succeed have momentum
        <span className="green bold">. T</span>he more they succeed
        <span className="green bold">,</span> the more they want to succeed, the
        more they find a way to succeed.
        <span className="green bold">. ^_^</span>
      </p>
    )
  }
];

export function getExampleByLevel(value: number): JSX.Element {
  const findResult = levelConfig.find(configItem => {
    return configItem.value === value;
  });
  if (findResult) {
    // @ts-ignore
    return findResult.example;
  } else {
    return levelConfig[0].example;
  }
}
