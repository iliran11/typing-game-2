import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export interface ProfileTabsProps {}

export interface ProfileTabsState {
  tabValue: number;
}

export default class ProfileTabs extends React.PureComponent<
  ProfileTabsProps,
  ProfileTabsState
> {
  constructor(props: ProfileTabsProps) {
    super(props);
    this.state = {
      tabValue: 0
    };
    this.onTabChange = this.onTabChange.bind(this);
  }
  onTabChange(event: any, tabValue: number) {
    this.setState({
      tabValue
    });
  }
  public render() {
    return (
      <div id="profile-tabs">
        <Tabs value={this.state.tabValue} onChange={this.onTabChange}>
          <Tab label="Stats" />
          <Tab label="Progress" />
          <Tab label="Videos" />
          <Tab label="Settings" />
        </Tabs>
      </div>
    );
  }
}
