import * as React from 'react';

export default function DebugInfo(props: any) {
  return (
    <div style={{ padding: 50 }}>
      <h2>Debug Info</h2>
      <p>
        <b>My Id: </b>
        {props.myId}
      </p>
      <p>
        <b>Room Number: </b>
        {props.roomId}
      </p>
      <p>
        <b>Total Players in room: (not updates when a player leaving) </b>
        {props.players.length}
      </p>
    </div>
  );
}
