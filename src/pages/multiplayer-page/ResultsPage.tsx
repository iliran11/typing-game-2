import * as React from 'react';
import {
  PlayerGameStatus,
  ScoreboardSectionData
} from '../../types/typesIndex';
import { PlayerResult } from '../../components/PlayerResult/PlayerResult';
export interface MultiplayerResultPageProps {
  roomId: string;
  players: PlayerGameStatus[];
  myId: string;
}

export class MultiplayerResultPage extends React.Component<
  MultiplayerResultPageProps,
  any
> {
  constructor(props: MultiplayerResultPageProps) {
    super(props);
    this.renderPlayerResult = this.renderPlayerResult.bind(this);
  }
  get myPosition() {
    const index = this.props.players.findIndex((player: PlayerGameStatus) => {
      return player.playerId === this.props.myId;
    });
    return index;
  }
  get sortedPlayerResults() {
    return this.props.players.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  renderPlayerResult(player: PlayerGameStatus, index: number) {
    const scores: ScoreboardSectionData[] = [
      { label: 'WPM', value: Math.floor(player.score) },
      // @ts-ignore
      { label: 'ACCURACY', value: `${Math.floor(player.accuracy)}%` },
      // @ts-ignore
      { label: 'TIME', value: '0:43' }
    ];
    console.log(player.playerId, this.props.myId);
    return (
      <PlayerResult
        playerAvatar={player.avatar}
        playerType={player.type}
        position={index}
        name={player.name}
        scores={scores}
        key={player.playerId}
        highlight={player.playerId === this.props.myId}
      />
    );
  }
  public render() {
    return (
      <div className="full-width">
        <div className="player-results-container">
          {this.sortedPlayerResults.map(this.renderPlayerResult)}
        </div>
      </div>
    );
  }
}
