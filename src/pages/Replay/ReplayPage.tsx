import * as React from 'react';
import ReplayManager from './ReplayManager';
import {
  PlayerAvatar,
  GameModelInterface,
  GameRecordsModel,
  TypingModelI
} from '../../types';
import { BoxLoader } from '../../components/boxLoader/boxLoader';

export interface ReplayPageProps {
  roomId: number;
  gameInfo: GameModelInterface;
  gameHistory: GameModelInterface;
  replay: GameRecordsModel[];
  myId: string;
  history: any;
  typingData: TypingModelI[];
  fetchReplay: any;
}

export default class ReplayPage extends React.Component<ReplayPageProps, any> {
  constructor(props: ReplayPageProps) {
    super(props);
    props.fetchReplay(props.roomId, this.props.myId);
  }
  get avatars(): PlayerAvatar[] | null {
    if (this.props.gameHistory) {
      return this.props.gameHistory.players.map(player => {
        return player.avatar;
      });
    }
    return null;
  }
  public render() {
    if (this.props.replay && this.avatars && this.props.typingData) {
      return <ReplayManager {...this.props} avatars={this.avatars} />;
    }
    return <BoxLoader message="Rewinding back the time" />;
  }
}
