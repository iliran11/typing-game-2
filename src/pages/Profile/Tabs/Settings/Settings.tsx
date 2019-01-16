import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import SetupLevelPanel from './SetupLevelPanelContainer';
import Logout from './Logout';

export interface SettingsProps {
  history: any;
}

export interface SettingsState {}

export default class Settings extends React.Component<
  SettingsProps,
  SettingsState
> {
  panels: any[];
  constructor(props: SettingsProps) {
    super(props);

    this.state = {};
    this.panels = [
      { header: <h3>Setup Your Level</h3>, body: <SetupLevelPanel /> },
      { header: <span>Training Program</span>, body: null },
      { header: <span>About us</span>, body: null },
      { header: <span>log out</span>, body: <Logout history={props.history} /> }
    ];
  }

  public render() {
    return (
      <div style={{ marginTop: 15 }}>
        {this.panels.map((data, index) => {
          return (
            <SettingsPanel header={data.header} body={data.body} key={index} />
          );
        })}
      </div>
    );
  }
}

function SettingsPanel(props: any) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {props.header}
      </ExpansionPanelSummary>
      {props.body && (
        <ExpansionPanelDetails>{props.body}</ExpansionPanelDetails>
      )}
    </ExpansionPanel>
  );
}
