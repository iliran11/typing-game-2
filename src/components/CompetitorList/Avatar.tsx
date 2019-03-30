import React from 'react';
import { PlayerAvatar } from 'src/types';

export function Avatar(props: PlayerAvatar) {
  return (
    <img className="full-width full-height round-corners" src={props.url} />
  );
}
