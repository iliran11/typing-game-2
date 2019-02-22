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
  highlight?: boolean;
}

export function PlayerResult(props: PlayerResultProps) {
  const highlightClass = props.highlight ? 'shadow-4dp' : '';
  const containerClass = `player-result-container display-flex flex-center full-width ${highlightClass}`;
  return (
    <div className={containerClass}>
      <section className="player-section non-flex display-flex flex-center">
        <span className="position-container">
          <span className="position">{props.position + 1}</span>
          <span className="ordinal-position">
            {ordinal(props.position + 1)}
          </span>
        </span>
        <div className="player-result-avatar">
          <Avatar playerAvatar={props.playerAvatar} type={props.playerType} />
        </div>
        <span className="competitor-name-section capitalize">{props.name}</span>
      </section>
      <div className="scoreboard display-flex flex-auto">
        {props.scores.map((score, index) => {
          return (
            <span
              className="score display-flex flex-column flex-center flex-auto"
              key={index}
            >
              <span className="value full-width text-center">
                {score.value}
              </span>
              <label className="label">{score.label}</label>
            </span>
          );
        })}
      </div>
    </div>
  );
}
