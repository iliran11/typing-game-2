import * as React from 'react';
import './box-loader.scss'

export interface BoxLoaderProps {}

export function BoxLoader(props: BoxLoaderProps) {
  return (
    <div className="container">
      <div className="holder">
        <div className="box" />
      </div>
      <div className="holder">
        <div className="box" />
      </div>
      <div className="holder">
        <div className="box" />
      </div>
    </div>
  );
}
