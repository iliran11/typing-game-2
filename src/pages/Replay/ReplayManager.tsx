import * as React from 'react';
import CompetitorList from '../../components/Scoreboard/CompetitorList';
import { ReplayPageProps } from './ReplayPage';
import { PlayerAvatar } from '../../types';
import GameView from '../../components/game-manager/GameView';
import TypingInputSimulator from './TypingInputSimulator';

export interface ReplayManagerProps extends ReplayPageProps {
  avatars: PlayerAvatar[];
}

enum DOCUMENT_TYPE {
  TYPING = 'typing',
  COMPETITOR = 'competitor'
}
interface TimelineMapI {
  document: any;
  documentType: DOCUMENT_TYPE;
  timeStamp: number;
}

export default class ReplayManager extends React.Component<
  ReplayManagerProps,
  any
> {
  allReplayDocuments: any;
  typingInputSimulator: TypingInputSimulator;
  timelineMap: TimelineMapI[];
  constructor(props: ReplayManagerProps) {
    super(props);
    this.timelineMap = [...this.props.typingData, ...this.props.replay]
      .map((document: any) => {
        return {
          document,
          documentType: document.gameTimeStamp
            ? DOCUMENT_TYPE.TYPING
            : DOCUMENT_TYPE.COMPETITOR,
          timeStamp:
            document.gameTimeStamp || document.gameTickSequenceId * 1000
        };
      })
      .sort((a, b) => {
        return a.timeStamp - b.timeStamp;
      });
    console.log(this.timelineMap);
    this.state = {
      stepIndex: 0,
      [DOCUMENT_TYPE.COMPETITOR]: this.props.replay[0],
      input: [],
      letters: [],
      lettersIndex: 0
    };
    this.typingInputSimulator = new TypingInputSimulator(
      this.props.gameInfo.letters
    );
    this.replayTick = this.replayTick.bind(this);
    this.handleTypingDocument = this.handleTypingDocument.bind(this);
    this.handleCompetitorReplay = this.handleCompetitorReplay.bind(this);
    // console.log('timelineMap has constructed: ', this.timelineMap);
  }
  componentDidMount() {
    this.setState(
      {
        letters: this.props.gameInfo.letters
      },
      this.replayTick
    );
  }
  get currentDocument(): TimelineMapI {
    return this.timelineMap[this.state.stepIndex];
  }
  get previousDocument(): TimelineMapI | null {
    const previousIndex = this.state.stepIndex - 1;
    if (previousIndex < 0) {
      return null;
    }
    return this.timelineMap[this.state.stepIndex - 1];
  }
  get nextDocument(): TimelineMapI | null {
    const nextIndex = this.state.stepIndex + 1;
    if (this.state.stepIndex < this.timelineMap.length) {
      return this.timelineMap[nextIndex];
    } else {
      return null;
    }
  }
  get shouldContinueReplayLoop(): boolean {
    return this.state.stepIndex <= this.timelineMap.length - 1;
  }
  get nextTickTime(): number {
    if (this.nextDocument) {
      return this.nextDocument.timeStamp - this.currentDocument.timeStamp;
    }
    return -1;
  }
  handleTypingDocument() {
    const nextTypingState = this.typingInputSimulator.nexTypingState(
      this.currentDocument.document
    );
    return {
      ...nextTypingState
    };
  }
  handleCompetitorReplay() {
    return {
      competitorReplayInstance: this.currentDocument.document.results
    };
  }
  replayTick() {
    let nextState = { ...this.state };
    if (this.currentDocument.documentType === DOCUMENT_TYPE.TYPING) {
      nextState = { ...nextState, ...this.handleTypingDocument() };
    }
    if (this.currentDocument.documentType === DOCUMENT_TYPE.COMPETITOR) {
      nextState = { ...nextState, ...this.handleCompetitorReplay() };
    }
    this.setState(
      {
        ...nextState,
        stepIndex: this.shouldContinueReplayLoop
          ? this.state.stepIndex + 1
          : this.state.stepIndex
      },
      () => {
        if (this.shouldContinueReplayLoop) {
          setTimeout(this.replayTick, this.nextTickTime);
        }
      }
    );
  }

  render() {
    return (
      <div id="game-page">
        <CompetitorList
          players={this.state.competitorReplayInstance}
          avatars={this.props.avatars}
          roomSize={this.props.replay[0].results.length}
          myId={this.props.myId}
          history={this.props.history}
        />
        <GameView
          letters={this.state.letters}
          input={this.state.input}
          gameActive={true}
          changeToolTipPosition={() => {}}
          closeTooltip={() => {}}
          gameIsFinished={() => {}}
        />
      </div>
    );
  }
}
