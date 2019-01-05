import * as React from 'react';
import { HighlightsTab } from './HighlightsTab';

export interface HighlightsManagerProps {
  fetchHighlights: any;
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
    return (
      <div id="highlights-tab">
        <HighlightsTab />
      </div>
    );
  }
}
