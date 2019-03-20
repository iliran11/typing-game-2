import * as React from 'react';
import { ActiveUserAvatarContainer } from 'src/components/ComponentsIndex';

interface ProfileHeaderProps {
  level: number;
  rank: number;
}

const ProfileHeader: React.SFC<ProfileHeaderProps> = props => {
  return (
    <div id="ranking">
      <ActiveUserAvatarContainer
        onClick={() => {}}
        height={90}
        className="active-user-avatar"
      />
    </div>
  );
};

export default ProfileHeader;
