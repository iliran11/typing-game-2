import React, { PureComponent } from 'react';
import CompetitorList from '../../components/Scoreboard/CompetitorList';
import {
  GameRecordsModel,
  GameModelInterface,
  PlayerAvatar,
  TypingModelI
} from '../../types';
import GameTyper from './GameTyper';

interface Props {
  roomId: number;
  gameInfo: GameModelInterface;
  gameHistory: GameModelInterface;
  replay: GameRecordsModel[];
  myId: string;
  history: any;
  typingData: TypingModelI[];
}

class ReplayPage extends PureComponent<Props, any> {
  replayTimer: any;
  typingTimer: any;
  constructor(props: any) {
    super(props);
    props.fetchReplay(props.roomId, this.props.myId);
    this.state = {
      currentStep: 0,
      index: 0,
      input: []
    };
  }
  componentDidMount() {
    this.replayTimer = setInterval(() => {
      this.setState({
        currentStep: this.state.currentStep + 1
      });
    }, 1100);
  }
  componentDidUpdate() {
    if (this.state.currentStep === this.props.replay.length - 1) {
      console.log('finished animation')
      clearInterval(this.replayTimer);
    }
  }
  get avatars(): PlayerAvatar[] | null {
    if (this.props.gameHistory) {
      return this.props.gameHistory.players.map(player => {
        return player.avatar;
      });
    }
    return null;
  }
  render() {
    if (this.props.replay && this.avatars) {
      return (
        <div id="game-page">
          <CompetitorList
            players={this.props.replay[this.state.currentStep].results}
            avatars={this.avatars}
            roomSize={this.props.replay[0].results.length}
            myId={this.props.myId}
            history={this.props.history}
          />
          {this.props.typingData && <GameTyper typingData={this.props.typingData} />}
        </div>
      );
    }
    return <div>wait for it</div>;
  }
}

export default ReplayPage;
