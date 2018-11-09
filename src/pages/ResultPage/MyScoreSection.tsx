import React from 'react'
import Star from '../../components/Star/Star'

export default function MyScoreSection() {
  return (
    <div id="my-score-data" className="gradient-7">
    <h1>Your Score:</h1>
    <div id="score-section-star">
      <Star><span className="larger-text">2</span>nd</Star>
    </div>
    <div id="score-details">
      <span>Speed:21 wpm</span>
      <br />
      <span>Accuracy:</span>
      <span>92%</span>
      <br />
      <span>Typed </span>21<span> words in </span>
      <span>1:32</span> minutes
    </div>
  </div>
  )
}