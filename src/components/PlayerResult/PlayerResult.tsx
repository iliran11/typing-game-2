import * as React from 'react';
import Avatar from '../CompetitorList/Avatar';
import {
  PlayerAvatar,
  PlayerType,
  ScoreboardSectionData
} from '../../types/typesIndex';
import { ordinal } from '../../utilities';

export interface PlayerResultProps {
  playerAvatar: PlayerAvatar;
  playerType: PlayerType;
  position: number;
  name: string;
  scores: ScoreboardSectionData[];
}

export function PlayerResult(props: PlayerResultProps) {
  console.log(props.scores);
  return (
    <div className="player-result display-flex flex-center">
      <span className="ordinal-place">
        {props.position + 1}
        <span>{ordinal(props.position + 1)}</span>
      </span>
      <div className="player-result-avatar">
        <Avatar playerAvatar={props.playerAvatar} type={props.playerType} />
      </div>
      <span className="competitor-name-section">{props.name}</span>
      <div className="scoreboard display-flex">
        {props.scores.map(score => {
          return (
            <span className="score display-flex flex-column flex-center">
              <span className="value">{score.value}</span>
              <label className="label">{score.label}</label>
            </span>
          );
        })}
      </div>
    </div>
  );
}
