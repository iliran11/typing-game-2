import * as React from 'react';
import {
  TypingGameInfoI,
  RoomType,
  PlayerGameStatus
} from '../../types/typesIndex';
import { BoxLoader } from '../../components/boxLoader/boxLoader';
import { TypingTestResultPage } from '../pagesIndex';

export interface GenericResultPageProps {
  roomType: RoomType;
  roomId: string;
  players: PlayerGameStatus[] | TypingGameInfoI;
  fetchReplay: any;
  myId: string;
}

export class GenericResultPage extends React.Component<
  GenericResultPageProps,
  any
> {
  constructor(props: GenericResultPageProps) {
    super(props);
    props.fetchReplay(props.roomId, props.myId);
  }
  public render() {
    console.log(this.props.players);
    if (Array.isArray(this.props.players) && this.props.players.length === 0)
      return <BoxLoader message="getting your result" />;
    if (!this.props.players) {
      return <div>error</div>;
    }
    if (this.props.roomType === RoomType.MULTIPLAYER) {
      return <div>multiplayer</div>;
    }
    return (
      <TypingTestResultPage
        // @ts-ignore
        data={this.props.players}
        roomId={this.props.roomId}
      />
    );
  }
}
