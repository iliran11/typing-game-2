import React, { Fragment } from 'react';
import GameView from './GameView';
import { gameDomManager } from './GameDomManager';
import socketManager from '../../socketManager';
import { RoomType } from '../../types';

export interface IAppProps {
  words: string[];
  gameType: RoomType;
  gameActive: boolean;
  onFinish: () => void;
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
    socketManager.emitTyping(event.target.value, this.props.gameType);
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
        <GameView
          words={this.props.words}
          gameActive={this.props.gameActive}
          onFinish={this.props.onFinish}
        />
      </Fragment>
    );
  }
}
