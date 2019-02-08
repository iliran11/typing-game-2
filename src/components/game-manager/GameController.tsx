import React from 'react';
import socketManager from '../../socketManager';
import GameView from './GameView';
import ToolTip from '../../components/tooltip';
import { RoomType } from '../../types/typesIndex';

interface State {
  index: number;
  input: string[];
  toolTipX: number;
  toolTipY: number;
  isOpen: boolean;
  tooltipInput: string;
}
export interface GameControllerProps {
  letters: string[];
  gameActive: boolean;
  gameType: RoomType;
}

export default class GameController extends React.Component<
  GameControllerProps,
  State
> {
  private inputRef: any;
  private bodyElement: any;
  tooltipTimer: any;
  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
    this.bodyElement = document.querySelector('body');
    this.state = {
      index: 0,
      input: [],
      toolTipX: 0,
      toolTipY: 0,
      tooltipInput: '',
      isOpen: false
    };
    this.updateInputArray = this.updateInputArray.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
    if (this.bodyElement) {
      this.bodyElement.addEventListener('click', this.onBodyClick);
    }
    this.changeToolTipPosition = this.changeToolTipPosition.bind(this);
    this.scheduleTooltipClosure = this.scheduleTooltipClosure.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
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
    socketManager.emitTyping(input, this.props.gameType);
    // if input is corret
    if (input === this.currentLetter.toLowerCase()) {
      this.setState({
        index: this.incrementIndex,
        input: updatedInput
      });
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
      this.inputRef.current.focus();
    }
  }
  scheduleTooltipClosure() {
    this.tooltipTimer = setTimeout(this.closeTooltip, 100000);
  }
  closeTooltip() {
    this.setState({
      isOpen: false
    });
  }
  changeToolTipPosition(toolTipX: number, toolTipY: number, input: string) {
    // we want that the arrow (not the most left border of the tooltip) will point exactly on the coordinate supplied
    const arrowOffset = 22 / 2;
    clearTimeout(this.tooltipTimer);
    this.setState(
      {
        toolTipX: toolTipX - arrowOffset,
        toolTipY,
        isOpen: true,
        tooltipInput: input
      },
      this.scheduleTooltipClosure
    );
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
        <ToolTip
          x={this.state.toolTipX}
          y={this.state.toolTipY}
          isOpen={this.state.isOpen}
          input={this.state.tooltipInput}
        />
        <GameView
          {...this.props}
          changeToolTipPosition={this.changeToolTipPosition}
          closeTooltip={this.closeTooltip}
          currentLetter={this.currentLetter}
          index={this.state.index}
          input={this.state.input} // this.scrollIntoView();
        />
      </React.Fragment>
    );
  }
}
