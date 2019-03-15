import * as React from 'react';
import { HighlightsI } from 'src/types/typesIndex';
import { ROOM_ID_PARM } from 'src/constants';
import { InlineLoader } from 'src/components/ComponentsIndex';
import { HighlightsList } from './HighlightsList';
export interface HighlightsManagerProps {
  fetchHighlights: any;
  highlights: HighlightsI;
  history: any;
}

export interface HighlightsManagerState {}

export default class HighlightsManager extends React.Component<
  HighlightsManagerProps,
  HighlightsManagerState
> {
  constructor(props: HighlightsManagerProps) {
    super(props);
    this.state = {};
    props.fetchHighlights();
    this.onHighlightItemClick = this.onHighlightItemClick.bind(this);
  }
  onHighlightItemClick(roomId: string) {
    this.props.history.push(`/replay?${ROOM_ID_PARM}=${roomId}`);
  }
  public render() {
    if (!this.props.highlights) {
      return (
        <div className="highlights-progress">
          <InlineLoader />
        </div>
      );
    }
    return (
      <div id="highlights-tab">
        <HighlightsList
          highlights={this.props.highlights}
          onItemClick={this.onHighlightItemClick}
        />
      </div>
    );
  }
}
