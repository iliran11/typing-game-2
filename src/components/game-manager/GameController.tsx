import React from 'react';
import socketManager from '../../socketManager';
import GameView from './GameView';

interface State {
  index: number;
  input: string[];
}

export default class GameController extends React.Component<any, State> {
  private inputRef: any;
  private bodyElement: any;

  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
    this.bodyElement = document.querySelector('body');
    this.state = {
      index: 0,
      input: []
    };
    this.updateInputArray = this.updateInputArray.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
    if (this.bodyElement) {
      this.bodyElement.addEventListener('click', this.onBodyClick);
    }
  }
  updateInputArray(index: number, input: string): string[] {
    const nextInputArray = [...this.state.input];
    nextInputArray[index] = input;
    return nextInputArray;
  }
  get currentLetter(): string {
    const { index } = this.state;
    return this.props.letters[index];
  }
  // get the next index value.
  get incrementIndex(): number {
    return this.state.index + 1;
  }
  onInput(event: any) {
    // if server indicated that game is not active - do not process input.
    if (!this.props.gameActive || !this.currentLetter) {
      return;
    }
    const { index } = this.state;
    const input: string = event.target.value.toLowerCase();
    const updatedInput = this.updateInputArray(index, input);
    socketManager.emitTyping(input);
    // if input is corret
    if (input === this.currentLetter.toLowerCase()) {
      this.props.closeTooltip();
      this.setState(
        {
          index: this.incrementIndex,
          input: updatedInput
        },
        () => {
          // this.scrollIntoView();
          // this.checkIfFinished();
        }
      );
    } else {
      // user entered wrong input. show him the tooltip.
      // this.showLetterTooltip(input);
      this.setState({
        input: updatedInput
      });
    }
  }
  componentWillUnmount() {
    this.bodyElement.removeEventListener('click', this.onBodyClick);
  }
  onBodyClick() {
    if (this.inputRef.current) {
      console.log(this.inputRef.current);
      this.inputRef.current.focus();
    }
  }
  render() {
    return (
      <React.Fragment>
        <input
          onChange={this.onInput}
          value={''}
          autoCorrect="off"
          autoCapitalize="none"
          autoFocus={true}
          // id="game-input"
          ref={this.inputRef}
        />
        <GameView
          {...this.props}
          currentLetter={this.currentLetter}
          index={this.state.index}
        />
      </React.Fragment>
    );
  }
}
