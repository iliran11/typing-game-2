import React from 'react';
import starSvg from '../../assets/277728-rewards/svg/medal.svg'

export default function Star(props: any) {
  return <div className="star-container">
  <img src={starSvg} className="star"/>
  <div className="star-text">{props.children}</div>
</div>;
}
