import * as React from 'react';
import CompetitorList from '../../components/Scoreboard/CompetitorList';
import { ReplayPageProps } from './ReplayPage';
import { PlayerAvatar } from '../../types';

export interface ReplayManagerProps extends ReplayPageProps {
  avatars: PlayerAvatar[];
}

enum documentType {
  TYPING = 'typing',
  COMPETITOR = 'competitor'
}

export default class ReplayManager extends React.Component<
  ReplayManagerProps,
  any
> {
  allReplayDocuments: any;
  timelineMap: {
    document: any;
    documentType: any;
    timeStamp: number;
  }[];
  constructor(props: ReplayManagerProps) {
    super(props);
    this.timelineMap = [...this.props.typingData, ...this.props.replay]
      .map((document: any) => {
        return {
          document,
          documentType: document.gameTimeStamp
            ? documentType.TYPING
            : documentType.COMPETITOR,
          timeStamp:
            document.gameTimeStamp || document.gameTickSequenceId * 1000
        };
      })
      .sort((a, b) => {
        return a.timeStamp - b.timeStamp;
      });
    // console.log(this.timelineMap);
    this.state = {
      stepIndex: 0,
      [documentType.COMPETITOR]: this.props.replay[0]
    };
    this.performOperation = this.performOperation.bind(this);
  }
  componentDidMount() {
    this.performOperation();
  }
  performOperation() {
    const currentDocument = this.timelineMap[this.state.stepIndex];

    const currentIndex = this.state.stepIndex;
    const previousDocument =
      currentIndex > 0 ? this.timelineMap[currentIndex - 1] : null;
    const nextCommandTime = previousDocument
      ? currentDocument.timeStamp - previousDocument.timeStamp
      : currentDocument.timeStamp;
    const isCompetitorType =
      currentDocument.documentType === documentType.COMPETITOR;
    const textToConsole = isCompetitorType
      ? 'competitor!'
      : currentDocument.document.typedLetter;
    const shouldContinue = this.state.stepIndex < this.timelineMap.length - 1;
    if (!isCompetitorType) {
      console.log(currentDocument.document.typedLetter);
    }
    this.setState(
      {
        stepIndex: this.state.stepIndex + 1,
        [isCompetitorType
          ? documentType.COMPETITOR
          : documentType.TYPING]: currentDocument.document
      },
      () => {
        if (shouldContinue) {
          setTimeout(this.performOperation, nextCommandTime);
        }
      }
    );
  }
  render() {
    return (
      <div id="game-page">
        <CompetitorList
          players={this.state[documentType.COMPETITOR].results}
          avatars={this.props.avatars}
          roomSize={this.props.replay[0].results.length}
          myId={this.props.myId}
          history={this.props.history}
        />
      </div>
    );
  }
}
