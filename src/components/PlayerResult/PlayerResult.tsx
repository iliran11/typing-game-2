import * as React from 'react';
import Avatar from '../CompetitorList/Avatar';
import { PlayerAvatar, PlayerType } from '../../types/typesIndex';
import { ordinal } from '../../utilities';
import { posix } from 'path';

export interface PlayerResultProps {
  playerAvatar: PlayerAvatar;
  playerType: PlayerType;
  position: number;
}

export function PlayerResult(props: PlayerResultProps) {
  return (
    <div>
      <span>
        {props.position}
        <span>{ordinal(props.position + 1)}</span>
      </span>
      <Avatar playerAvatar={props.playerAvatar} type={props.playerType} />
      
    </div>
  );
}
