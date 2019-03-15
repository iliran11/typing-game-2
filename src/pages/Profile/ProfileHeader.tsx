import * as React from 'react';
import { ActiveUserAvatarContainer } from 'src/components/ComponentsIndex';

interface ProfileHeaderProps {
  level: number;
  rank: number;
}

const ProfileHeader: React.SFC<ProfileHeaderProps> = props => {
  return (
    <div id="ranking">
      <div className="ranking-section">
        <span className="big-header">{`Level ${props.level}`}</span>
        <span className="info-footer">the difficulty of the text</span>
      </div>
      <ActiveUserAvatarContainer onClick={() => {}} height={90} />
      <div className="ranking-section">
        <span className="big-header">{props.rank}</span>
        <span className="info-footer">Your rank in app</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
