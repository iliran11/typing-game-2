import * as React from 'react';
import './profilePage.scss';
import ProfileHeader from './ProfileHeader';
import { ProgressBar } from './ProgressBar';
import ProfileTabs from './ProfileTabs';
export interface ProfilePageProps {
  fullName: string;
  rank: number;
  level: number;
  progressToNextLevel: number;
  profileMainLoad: any;
  playerId: string;
  maxWpm: number;
}


export default class ProfilePage extends React.Component<
  ProfilePageProps,
  any
> {
  constructor(props: ProfilePageProps) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.props.profileMainLoad(this.props.playerId).then(() => {
      this.setState({
        isLoading: false
      });
    });
  }
  public render() {
    if (!this.props.playerId) {
      return <h1>You are not logged in! </h1>;
    }
    if (this.state.isLoading) {
      return <h1>LOADING !! </h1>;
    }
    if (this.props.maxWpm === -1) {
      return <h1> EMPTY STATE </h1>;
    }
    return (
      <div id="profile-page">
        <h1>{this.props.fullName}</h1>
        <ProfileHeader rank={this.props.rank} level={this.props.level} />
        <ProgressBar progressToNextLevel={this.props.progressToNextLevel} />
        <ProfileTabs />
      </div>
    );
  }
}
