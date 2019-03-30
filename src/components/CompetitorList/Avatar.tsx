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
