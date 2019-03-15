import React from 'react';
import { PlayerType, PlayerAvatar } from 'src/types';
import { pictureByFacebookId } from 'src/utilities';
import avatar1 from 'src/assets/145851-young-avatar-collection/svg/avatar1.svg';
import avatar2 from 'src/assets/145851-young-avatar-collection/svg/avatar2.svg';
import avatar3 from 'src/assets/145851-young-avatar-collection/svg/avatar3.svg';
import avatar4 from 'src/assets/145851-young-avatar-collection/svg/avatar4.svg';
import bot1 from 'src/assets/740063-robot-avatars/svg/bot1.svg';
import bot19 from 'src/assets/740063-robot-avatars/svg/bot19.svg';
import bot3 from 'src/assets/740063-robot-avatars/svg/bot3.svg';
import bot15 from 'src/assets/740063-robot-avatars/svg/bot15.svg';

interface Props {
  type: PlayerType;
  playerAvatar: PlayerAvatar;
  className?: string;
}
const style = {
  height: '100%',
  width: '100%'
};

export function Avatar(props: Props) {
  if (props.playerAvatar.isAnonymous) {
    return getAnonymousAvatar(
      props.type,
      props.playerAvatar.picture,
      props.className
    );
  } else {
    // @ts-ignore
    const authenticatedAvatar = {
      ...style,
      borderRadius: '50%'
    };
    //@ts-ignore
    const imageUrl = pictureByFacebookId(props.playerAvatar.picture);
    return <img style={authenticatedAvatar} src={imageUrl} />;
  }
}

function getAnonymousAvatar(
  type: PlayerType,
  index: number | string,
  className: any
) {
  if (PlayerType.human === type) {
    switch (index) {
      case 1:
        return <img style={style} src={avatar1} className={className} />;
      case 2:
        return <img style={style} src={avatar2} className={className} />;
      case 3:
        return <img style={style} src={avatar3} className={className} />;
      case 4:
        return <img style={style} src={avatar4} className={className} />;
      default:
        return null;
    }
  } else {
    switch (index) {
      case 1:
        return <img style={style} src={bot1} className={className} />;
      case 2:
        return <img style={style} src={bot19} className={className} />;
      case 3:
        return <img style={style} src={bot3} className={className} />;
      case 4:
        return <img style={style} src={bot15} className={className} />;
      default:
        return null;
    }
  }
}
