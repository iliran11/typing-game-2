import React from 'react';
import { PlayerType } from '../../types';
import avatar1 from '../../assets/145851-young-avatar-collection/svg/avatar1.svg';
import bot1 from '../../assets/740063-robot-avatars/svg/bot1.svg';

interface Props {
  type: PlayerType
}
const style = {
  height: '100%',
  width: '100%'
};

export default function Avatar(props:Props) {
  if (PlayerType.human===props.type) {
    return <img src={avatar1} style={style} />;
  } else {
    return <img src={bot1} style={style} />;
  }
}
