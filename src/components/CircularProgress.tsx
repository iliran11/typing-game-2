import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgress(props: any) {
  const styles = {
    text: { fontSize: 30 }
  };
  return (
    <CircularProgressbar
      styles={styles}
      strokeWidth={15}
      percentage={props.percentage * 100}
      text={`${props.text}`}
    />
  );
}
