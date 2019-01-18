import React from 'react';
import { GameModelInterface, PlayerSerialize } from '../../types';
import { MAX_WPM_GAUGE } from '../../constants';
import Avatar from '../../components/CompetitorList/Avatar';
import CircularProgress from '../../components/CircularProgress';

interface Props {
  item: GameModelInterface;
}

export default function GameHistoryItem(props: Props) {
  if (props.item.finalResult) {
    return (
      <div className="game-history-item">
        {props.item.players.map((player: PlayerSerialize, index: number) => {
          if (props.item.finalResult.results[index]) {
            const result = Math.floor(
              // @ts-ignore
              props.item.finalResult.results[index].score
            );
            const percentage = result / MAX_WPM_GAUGE;
            return (
              <div className="history-item-player" key={index}>
                <div className="history-item-avatar">
                  <Avatar type={player.type} playerAvatar={player.avatar} />
                </div>
                <CircularProgress percentage={percentage} text={result} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    return null;
  }
}
