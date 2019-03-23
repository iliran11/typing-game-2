import * as React from 'react';
import { PlayerGameStatus, ScoreSectionsData } from 'src/types/typesIndex';
import { PlayerResult, Title } from 'src/components/ComponentsIndex';
import { ordinal } from 'src/utilities';
import { TimeManager } from 'src/middlewares/TimeManager';
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
    const scores: ScoreSectionsData[] = [
      { label: 'WPM', value: Math.floor(player.wpm) },
      // @ts-ignore
      { label: 'ACCURACY', value: `${Math.floor(player.accuracy * 100)}%` },
      // @ts-ignore
      {
        label: 'TIME',
        value: TimeManager.millisecondsToTimeFormat(player.gameDuration)
      }
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
