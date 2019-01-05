import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import SetupLevelPanel from './SetupLevelPanel';

export interface SettingsProps {
  history: any;
}

export interface SettingsState {}

export default class Settings extends React.Component<
  SettingsProps,
  SettingsState
> {
  constructor(props: SettingsProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div style={{ marginTop: 15 }}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Setup Your Level</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SetupLevelPanel />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            Training Program
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            About Us
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            Log Out
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </div>
    );
  }
}
