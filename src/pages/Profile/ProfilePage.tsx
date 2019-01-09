import * as React from 'react';
import './profilePage.scss';
import ProfileHeader from './ProfileHeaderContainer';
import ProgressBar from './ProgressBarContainer';
import ProfileTabs from './ProfileTabs';
import {BoxLoader} from '../../components/boxLoader/boxLoader';
export interface ProfilePageProps {
  profileMainLoad: any;
  isDataPopulated: boolean;
  playerId: string;
  fullName: string;
  history: any;
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
      return <BoxLoader />;
    }
    if (this.props.isDataPopulated === false) {
      return <h1> EMPTY STATE </h1>;
    }
    return (
      <div id="profile-page">
        <section id="profile-info-section">
          <h1>{this.props.fullName}</h1>
          <ProfileHeader />
          <ProgressBar />
        </section>
        <ProfileTabs history={this.props.history} />
      </div>
    );
  }
}
