import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Progress from './Tabs/Progress';
import Settings from './Tabs/Settings';
import Stats from './Tabs/Stats';
import Videos from './Tabs/Videos';

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
    const { tabValue } = this.state;
    return (
      <div id="profile-tabs">
        <Tabs value={tabValue} onChange={this.onTabChange}>
          <Tab label="Stats" />
          <Tab label="Progress" />
          <Tab label="Videos" />
          <Tab label="Settings" />
        </Tabs>
        {tabValue === 0 && <Stats />}
        {tabValue === 1 && <Progress />}
        {tabValue === 2 && <Videos />}
        {tabValue === 3 && <Settings />}
      </div>
    );
  }
}
