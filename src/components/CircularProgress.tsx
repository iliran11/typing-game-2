import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgress(props: any) {
  // const percent = 25;

  const percent = props.percentage * 100;
  const styles = {
    text: { fontSize: 30 },
    path: { stroke: getCircleColor(percent) }
  };
  return (
    <CircularProgressbar
      styles={styles}
      strokeWidth={15}
      percentage={percent}
      text={`${props.text}`}
      initialAnimation={true}
    />
  );
}

function getCircleColor(percent: number) {
  if (percent < 25) {
    return '#B3DE81';
  }
  if (percent < 70) {
    return '#68A225';
  }
  return '#265C00';
}
