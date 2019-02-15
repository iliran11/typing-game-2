import React, { Fragment } from 'react';
import GameView from './GameView';
import { gameDomManager } from './GameDomManager';

export interface IAppProps {
  words: string[];
}

export interface IAppState {}

export default class IApp extends React.Component<IAppProps, IAppState> {
  private inputRef: any;
  private bodyElement: any;
  constructor(props: IAppProps) {
    super(props);
    this.onInput = this.onInput.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
    this.state = {};
    this.inputRef = React.createRef();
    this.bodyElement = document.querySelector('body');
    if (this.bodyElement) {
      this.bodyElement.addEventListener('click', this.onBodyClick);
    }
  }
  componentWillUnmount() {
    this.bodyElement.removeEventListener('click', this.onBodyClick);
  }
  componentDidMount() {
    console.log(this.inputRef)
    this.inputRef.current.focus();
  }
  componentDidUpdate(prevProps: IAppProps) {}
  onBodyClick() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }
  onInput(event: any) {
    gameDomManager.onInput(event.target.value);
  }

  public render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
