import * as React from 'react';
import GameView from './GameView';

export interface IAppProps {
  words: string[];
}

export interface IAppState {}

export default class IApp extends React.Component<IAppProps, IAppState> {
  private inputRef: any;
  private bodyElement: any;
  private input: string[];
  private index: number;
  private letters: string[];
  constructor(props: IAppProps) {
    super(props);
    this.state = {};
    this.inputRef = React.createRef();
    this.onBodyClick = this.onBodyClick.bind(this);
    this.input = [];
    this.letters = [];
    this.index = 0;
    this.bodyElement = document.querySelector('body');
    if (this.bodyElement) {
      this.bodyElement.addEventListener('click', this.onBodyClick);
    }
  }
  componentWillUnmount() {
    this.bodyElement.removeEventListener('click', this.onBodyClick);
  }
  componentDidUpdate(prevProps: IAppProps) {
    if (this.props.words.length > 0 && prevProps.words.length === 0) {
      this.letters = this.props.words.join('').split('');
      console.log(this.letters);
    }
  }
  onBodyClick() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }
  onInput(event: any) {
    const value = event.target.value;
  }

  public render() {
    return (
      <div>
        <input
          onChange={this.onInput}
          value={''}
          autoCorrect="off"
          autoCapitalize="none"
          autoFocus={true}
          // id="game-input"
          ref={this.inputRef}
        />
        <GameView letters={this.props.words} />
      </div>
    );
  }
}
