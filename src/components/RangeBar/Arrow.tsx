import * as React from 'react';

export interface ArrowProps {
}

export function Arrow (props: ArrowProps) {
    return (
      <div className="rangebar-arrow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="rangebar-triangle"
        viewBox="0 0 40 50"
      >
        <polygon points="20,0 40,50 0,50" />
      </svg>
    </div>  
    );
}
