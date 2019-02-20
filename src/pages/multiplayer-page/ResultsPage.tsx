import * as React from 'react';

export interface MultiplayerResultPageProps {
  roomId: string;
}

export function MultiplayerResultPage(props: MultiplayerResultPageProps) {
  return <div>{props.roomId}</div>;
}
