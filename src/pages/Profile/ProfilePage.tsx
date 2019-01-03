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
}

export default class ProfilePage extends React.Component<
  ProfilePageProps,
  any
> {
  constructor(props: ProfilePageProps) {
    super(props);
  }
  componentDidUpdate(prevProps: ProfilePageProps) {
    if (!prevProps.playerId && this.props.playerId) {
      this.props.profileMainLoad(this.props.playerId);
    }
  }
  public render() {
    if (!this.props.playerId) {
      return <h1>logging in ... </h1>;
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
