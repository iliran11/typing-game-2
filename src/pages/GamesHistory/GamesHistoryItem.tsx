import React from 'react';
import { GameModelInterface, PlayerSerialize } from '../../types';

interface Props {
  item: GameModelInterface;
}

export default function GameHistoryItem(props: Props) {
  return (
    <div className="game-history-item">
      {props.item.players.map((player: PlayerSerialize, index: number) => {
        return <div className="history-item-player">{player.name}</div>;
      })}
    </div>
  );
}
