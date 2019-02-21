import * as React from 'react';
import { PlayerGameStatus } from '../../types/typesIndex';
import { networkManager } from '../../NetworkManager';
import { BoxLoader } from '../../components/boxLoader/boxLoader';

export interface MultiplayerResultPageProps {
  roomId: string;
  myPosition: number;
  players: PlayerGameStatus[];
  fetchReplay: any;
  myId: string;
}

export class MultiplayerResultPage extends React.Component<
  MultiplayerResultPageProps,
  any
> {
  constructor(props: MultiplayerResultPageProps) {
    super(props);
    props.fetchReplay(props.roomId, props.myId);
  }
  public render() {
    if (this.props.players.length === 0) {
      return <BoxLoader message="Retrieving history ... " />;
    }
    return <div>hi</div>;
  }
}
