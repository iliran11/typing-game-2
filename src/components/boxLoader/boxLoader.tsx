import * as React from 'react';
import 'src/css/components/box-loader.scss';

export interface BoxLoaderProps {
  message: string;
}

export function BoxLoader(props: BoxLoaderProps) {
  return (
    <div>
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
      <div className="words-container">{props.message} </div>
    </div>
  );
}
