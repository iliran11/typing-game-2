import React from 'react'
import Medal from '../../components/Medal/Medal'

interface Props {
  speed:number;
  numberOfLetters:number;
  gameDuration:number;
}
export default function MyScoreSection(props:Props) {
  const gameDurationSeconds = Math.round(props.gameDuration / 1000)
  return (
    <div id="my-score-data" className="gradient-7">
    <h1>Your Score:</h1>
    <div id="score-section-star">
      <Medal><span className="larger-text">2</span>nd</Medal>
    </div>
    <div id="score-details">
      <span>Speed:{props.speed} wpm</span>
      <br />
      {/* <span>Accuracy:</span>
      <span>92%</span>
      <br /> */}
      <span>Typed </span>{props.numberOfLetters}<span> words in </span>
      <span>{gameDurationSeconds}</span> seconds
    </div>
  </div>
  )
}