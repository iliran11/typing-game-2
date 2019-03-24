import * as React from 'react';
import ProfileHeader from './ProfileHeaderContainer';
// import ProgressBar from './ProgressBarContainer';
import ProfileTabs from './ProfileTabs';
import { ProfileEmptyState } from './ProfileEmptyState';
import 'src/css/pages/profile-page.scss';
import { BoxLoader } from 'src/components/ComponentsIndex';
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
    this.navigateToGame = this.navigateToGame.bind(this);
  }
  navigateToGame() {
    this.props.history.push('/game');
  }
  public render() {
    if (!this.props.playerId) {
      return <h1>You are not logged in! </h1>;
    }
    if (this.state.isLoading) {
      return <BoxLoader message="Calculating your achievments so far" />;
    }
    return (
      <div id="profile-page" className="page">
        <div className="profile-scroller">
          <section id="profile-info-section">
            <h1>{this.props.fullName}</h1>
            <ProfileHeader />
            {/* <ProgressBar /> */}
          </section>
          {this.props.isDataPopulated && (
            <ProfileTabs history={this.props.history} />
          )}
          {this.props.isDataPopulated === false && (
            <ProfileEmptyState navigateToGame={this.navigateToGame} />
          )}
        </div>
      </div>
    );
  }
}
