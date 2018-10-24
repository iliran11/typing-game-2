import * as React from 'react';

export default function DebugInfo(props: any) {
  const { myId, roomId, players, version } = props;
  return (
    <div style={{ padding: 50 }}>
      <h2>Debug Info</h2>
      <InfoLine title="My Id" value={myId || 'non yet'} />
      <InfoLine title="Room Number" value={roomId} />
      <InfoLine title="Total Players In Room" value={players.length} />
      <InfoLine title="Max Players In Room" value={players.length} />
      <InfoLine title="Client Version" value={version} />
    </div>
  );
}

function InfoLine({ title, value }: { title: string; value: any }) {
  return (
    <p>
      <b>{title}:</b>
      <span>{` `}{value}</span>
    </p>
  );
}
