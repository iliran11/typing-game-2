import * as React from 'react';
import { PlayerGameStatus } from '../../types/typesIndex';
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
    return (
      <PlayerResult
        playerAvatar={player.avatar}
        playerType={player.type}
        position={index}
      />
    );
  }
  public render() {
    return this.props.players.map(this.renderPlayerResult);
  }
}
