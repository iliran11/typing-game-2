import * as React from 'react';
import { HighlightsTab } from './HighlightsTab';
import { HighlightsI } from '../../../../types';

export interface HighlightsManagerProps {
  fetchHighlights: any;
  highlights: HighlightsI;
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
  }

  public render() {
    if (!this.props.highlights) {
      return <h1>Loading...</h1>;
    }
    return (
      <div id="highlights-tab">
        <HighlightsTab highlights={this.props.highlights} />
      </div>
    );
  }
}
