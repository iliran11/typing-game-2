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
  }
  get myPosition() {
    const index = this.props.players.findIndex((player: PlayerGameStatus) => {
      return player.playerId === this.props.myId;
    });
    return index;
  }
  renderPlayerResult(player: PlayerGameStatus, index: number) {
    const scores: ScoreboardSectionData[] = [
      { label: 'WPM', value: Math.floor(player.score) },
      // @ts-ignore
      { label: 'ACCURACY', value: `${Math.floor(player.accuracy)}%` },
      // @ts-ignore
      { label: 'TIME', value: '0:43' }
    ];
    return (
      <PlayerResult
        playerAvatar={player.avatar}
        playerType={player.type}
        position={index}
        name={player.name}
        scores={scores}
      />
    );
  }
  public render() {
    return this.props.players.map(this.renderPlayerResult);
  }
}
