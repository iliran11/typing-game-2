import * as React from 'react';
import './profilePage.scss';
import ProfileHeader from './ProfileHeader';
import { ProgressBar } from './ProgressBar';

export interface ProfilePageProps {
  fullName: string;
  rank: number;
  level: number;
  progressToNextLevel: number;
}

export default class ProfilePage extends React.Component<
  ProfilePageProps,
  any
> {
  public render() {
    return (
      <div id="profile-page">
        <h1>{this.props.fullName}</h1>
        <ProfileHeader rank={this.props.rank} level={this.props.level} />
        <ProgressBar progressToNextLevel={this.props.progressToNextLevel} />
      </div>
    );
  }
}
