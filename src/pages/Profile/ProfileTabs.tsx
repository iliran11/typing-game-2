import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Progress from './Tabs/Progress';
import Settings from './Tabs/Settings/Settings';
import Stats from './Tabs/Stats/StatsContainer';
import Highlights from './Tabs/Highlights/HighlightManagerContainer';

export interface ProfileTabsProps {
  history: any;
}

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
        <Tabs value={tabValue} centered onChange={this.onTabChange}>
          <Tab label="Multiplayer" />
          {/* <Tab label="Progress" /> */}
          <Tab label="Typing Test" />
        </Tabs>
        {tabValue === 0 && <Stats history={this.props.history} />}
        {/* {tabValue === 1 && <Progress history={this.props.history} />} */}
        {tabValue === 1 && <Highlights history={this.props.history} />}
      </div>
    );
  }
}
