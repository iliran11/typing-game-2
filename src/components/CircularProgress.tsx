import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgress(props:any) {
  return (
    <CircularProgressbar percentage={props.percentage*100} text={`${props.text}`} />
  );
}
