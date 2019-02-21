import * as React from 'react';
import { PlayerGameStatus } from '../../types/typesIndex';
import { networkManager } from '../../NetworkManager';
import { BoxLoader } from '../../components/boxLoader/boxLoader';

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
  public render() {
    if (this.props.players.length === 0) {
      return <BoxLoader message="Retrieving history ... " />;
    }
    return <div>hi {this.myPosition}</div>;
  }
}
