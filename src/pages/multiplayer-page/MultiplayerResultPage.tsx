import * as React from 'react';
import {
  PlayerGameStatus,
  ScoreboardSectionData
} from '../../types/typesIndex';
import { PlayerResult } from '../../components/PlayerResult/PlayerResult';
import { ordinal, millisecondsToTimeResult } from '../../utilities';
import { Title } from '../../components/Title/Title';
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
    const index = this.sortedPlayerResults.findIndex(
      (player: PlayerGameStatus) => {
        return player.playerId === this.props.myId;
      }
    );
    return index;
  }
  get sortedPlayerResults() {
    return this.props.players.sort((a, b) => {
      if (a.wpm > b.wpm) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  renderPlayerResult(player: PlayerGameStatus, index: number) {
    const scores: ScoreboardSectionData[] = [
      { label: 'WPM', value: Math.floor(player.wpm) },
      // @ts-ignore
      { label: 'ACCURACY', value: `${Math.floor(player.accuracy * 100)}%` },
      // @ts-ignore
      { label: 'TIME', value: millisecondsToTimeResult(player.gameDuration) }
    ];
    return (
      <PlayerResult
        playerAvatar={player.avatar}
        playerType={player.type}
        position={index}
        name={player.name}
        scores={scores}
        key={player.playerId}
        highlight={player.playerId === this.props.myId}
        hasFinished={player.hasFinished}
      />
    );
  }
  get positionTitle() {
    const position = this.myPosition;
    if (position === 0) {
      return 'YOU WON';
    } else {
      return `${position + 1}${ordinal(position + 1)} Place`;
    }
  }
  public render() {
    return (
      <div className="full-width multiplayer-results-page">
        <div className="title text-center bold">{this.positionTitle}</div>
        <Title />
        <div className="player-results-container">
          {this.sortedPlayerResults.map(this.renderPlayerResult)}
        </div>
        <Title className="align-right" />
      </div>
    );
  }
}
