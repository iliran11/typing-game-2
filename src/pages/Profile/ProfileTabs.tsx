import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { GameType } from 'src/types/typesIndex';
import { Stats2Container } from 'src/pages/Profile/Stats2/Stats2Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export interface ProfileTabsProps {
  history: any;
}

export interface ProfileTabsState {
  tabValue: number;
  platform: 'mobile' | 'desktop';
}

export default class ProfileTabs extends React.PureComponent<
  ProfileTabsProps,
  ProfileTabsState
> {
  constructor(props: ProfileTabsProps) {
    super(props);
    this.state = {
      tabValue: 0,
      platform: 'mobile'
    };
    this.onTabChange = this.onTabChange.bind(this);
  }
  onTabChange(event: any, tabValue: number) {
    this.setState({
      tabValue
    });
  }
  handlePlatformChange = (event: any) => {
    this.setState({
      platform: event.target.value
    });
  };
  renderPlatformChooser = () => {
    return (
      <RadioGroup
        aria-label="Gender"
        name="gender1"
        value={this.state.platform}
        classes={{ root: 'platform-chooser' }}
        onChange={this.handlePlatformChange}
      >
        <FormControlLabel value="desktop" control={<Radio />} label="desktop" />
        <FormControlLabel value="mobile" control={<Radio />} label="mobile" />
      </RadioGroup>
    );
  };
  public render() {
    const { tabValue } = this.state;
    return (
      <div id="profile-tabs">
        <Tabs
          value={tabValue}
          centered
          onChange={this.onTabChange}
          classes={{ indicator: 'tabs-indicator' }}
        >
          <Tab label="Multiplayer" />
          {/* <Tab label="Progress" /> */}
          <Tab label="Typing Test" />
        </Tabs>
        <div className="position-relative">
          {this.renderPlatformChooser()}
          {tabValue === 0 && (
            <Stats2Container
              platform={this.state.platform}
              gameType={GameType.multiplayer}
            />
          )}
          {tabValue === 1 && (
            <Stats2Container
              platform={this.state.platform}
              gameType={GameType.typingTest}
            />
          )}
        </div>
      </div>
    );
  }
}
