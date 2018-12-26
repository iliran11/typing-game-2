import React, { PureComponent } from 'react';
import GameView from '../../components/game-manager/GameView';
import { TypingModelI } from '../../types';

interface Props {
  typingData: TypingModelI[];
}

class GameTyper extends PureComponent<Props, any> {
  typingTimer: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      input: []
    };
    this.performTyping = this.performTyping.bind(this);
  }
  componentDidMount() {
    this.typingTimer = window.setTimeout(
      this.performTyping,
      this.props.typingData[0].gameTimeStamp
    );
    // this.props.typingData.map((data)=>{
    //   console.log(data.gameTimeStamp)
    // })
  }
  performTyping() {
    const typingObject = this.props.typingData[this.state.index];
    console.log('typed: ', typingObject.typedLetter);
    if (!this.props.typingData[this.state.index + 1]) {
      clearTimeout(this.typingTimer);
      return;
    }
    this.setState(
      {
        index: this.state.index + 1,
        input: [this.state.input, typingObject.typedLetter],
        gameTimeStamp: typingObject.gameTimeStamp
      },
      () => {
        this.typingTimer = window.setTimeout(
          this.performTyping,
          this.props.typingData[this.state.index].gameTimeStamp -
            this.state.gameTimeStamp
        );
      }
    );
  }
  render() {
    return <div />;
  }
}

export default GameTyper;
