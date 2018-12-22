import React from 'react';
import { GameModelInterface, PlayerSerialize } from '../../types';
import { MAX_WPM_GAUGE } from '../../constants';
import Avatar from '../../components/Scoreboard/Avatar';
import CircularProgress from '../../components/CircularProgress';

interface Props {
  item: GameModelInterface;
}

export default function GameHistoryItem(props: Props) {
  if (!props.item.finalResult) return null;
  return (
    <div className="game-history-item">
      {props.item.players.map((player: PlayerSerialize, index: number) => {
        const result = Math.floor(props.item.finalResult.results[index].score);
        const percentage = result / MAX_WPM_GAUGE;
        return (
          <div className="history-item-player">
            <div className="history-item-avatar">
              <Avatar type={player.type} playerAvatar={player.avatar} />
            </div>
            <CircularProgress percentage={percentage} text={result} />
          </div>
        );
      })}
    </div>
  );
}
