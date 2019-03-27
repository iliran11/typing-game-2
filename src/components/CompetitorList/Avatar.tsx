import React from 'react';
import { PlayerType, PlayerAvatar } from 'src/types';
import { pictureByFacebookId } from 'src/utilities';

interface Props {
  url: string;
}
const style = {
  height: '100%',
  width: '100%'
};

export function Avatar(props: Props) {
  // @ts-ignore
  const authenticatedAvatar = {
    ...style,
    borderRadius: '50%'
  };
  //@ts-ignore
  const imageUrl = pictureByFacebookId(props.playerAvatar.picture);
  return <img style={authenticatedAvatar} src={props.url} />;
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
