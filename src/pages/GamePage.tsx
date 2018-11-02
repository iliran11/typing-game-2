import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import socketManager from '../socketManager';
import GameManagerContainer from '../components/game-manager/gameManagerContainer';
import ScoreBoardContainer from '../components/Scoreboard/ScoreBoardContainer';
import CountDown from '../components/CountDown/CountDown';
import ToolTip from '../components/tooltip';

interface Props {
  isGameActive: boolean;
}
interface State {
  toolTipX: number;
  toolTipY: number;
  timerActive: boolean;
  gameActive: boolean;
  isOpen: boolean;
  tooltipInput: string;
}

class GamePage extends PureComponent<Props, State> {
  currentInput: string;
  tooltipTimer: any;

  constructor(props: any) {
    super(props);
    socketManager.initSocket(props.dispatch);
    this.state = {
      timerActive: false,
      gameActive: false,
      toolTipX: 0,
      toolTipY: 0,
      tooltipInput: '',
      isOpen: false
    };
    this.onTimerFinish = this.onTimerFinish.bind(this);
    this.changeToolTipPosition = this.changeToolTipPosition.bind(this);
    this.scheduleTooltipClosure = this.scheduleTooltipClosure.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
  }
  componentDidUpdate(prevProps: Props) {
    // game has become active on server - turn on the timer!;
    if (prevProps.isGameActive === false && this.props.isGameActive) {
      this.setState({
        timerActive: true
      });
    }
  }
  onTimerFinish() {
    this.setState({
      timerActive: false,
      gameActive: true
    });
  }
  scheduleTooltipClosure() {
    this.tooltipTimer = setTimeout(this.closeTooltip, 1000);
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
      <div id="game-page">
        {this.state.timerActive && (
          <CountDown onTimerFinish={this.onTimerFinish} />
        )}
        <ToolTip
          x={this.state.toolTipX}
          y={this.state.toolTipY}
          isOpen={this.state.isOpen}
          input={this.state.tooltipInput}
        />
        <ScoreBoardContainer />
        <GameManagerContainer
          gameActive={this.state.gameActive}
          changeToolTipPosition={this.changeToolTipPosition}
          closeTooltip={this.closeTooltip}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isGameActive: state.serverStatus.isGameActive
  };
};
export default connect(mapStateToProps)(GamePage);
