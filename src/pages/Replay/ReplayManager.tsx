import * as React from 'react';
import { GameView, CompetitorList } from 'src/components/ComponentsIndex';
import { PlayerAvatar } from '../../types';
import { GameDomManager } from 'src/components/game-manager/GameDomManager';
import { ReplayPageProps } from './ReplayPage';

export interface ReplayManagerProps extends ReplayPageProps {
  avatars: PlayerAvatar[];
  words: string[];
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
  tooltipTimer: any;
  allReplayDocuments: any;
  timelineMap: TimelineMapI[];
  domManager: GameDomManager;
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
    this.state = {
      stepIndex: 0,
      competitorReplayInstance: this.props.replay[0].results
    };
    this.domManager = new GameDomManager();
    this.replayTick = this.replayTick.bind(this);
    this.handleCompetitorReplay = this.handleCompetitorReplay.bind(this);
  }
  componentDidMount() {
    this.replayTick();
  }
  get currentDocument(): TimelineMapI {
    return this.timelineMap[this.state.stepIndex];
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
  handleCompetitorReplay() {
    return {
      competitorReplayInstance: this.currentDocument.document.results
    };
  }
  replayTick() {
    let nextState = { ...this.state };
    if (this.currentDocument.documentType === DOCUMENT_TYPE.TYPING) {
      this.domManager.onInput(this.currentDocument.document.typedLetter);
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
  // END OF MOVE TO HOC
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
        <GameView words={this.props.words} gameDomManager={this.domManager} />
      </div>
    );
  }
}
