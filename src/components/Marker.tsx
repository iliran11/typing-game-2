import * as React from 'react';

export interface markerProps {
  x: number;
  y: number;
  width: number;
  input: string;
  height: number;
}

function WordPointer({ x, y, width, height, input }: markerProps) {
  const style = {
    width,
    height,
    left: x,
    top: y
  };

  return (
    <div style={style} id="marker" className="gradient-5 shadow-4dp">
      {input}
    </div>
  );
}

export default WordPointer;
