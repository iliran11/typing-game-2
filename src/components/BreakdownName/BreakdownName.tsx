/** component for breaking down full names
 *  to first name and last name. ignoring the rest.
 *  also include text-overflow techniques for each name seperately.
 */

import React from 'react';
import 'src/css/components/breakdownName.scss';

export interface BreakdownNameProps {
  name: string;
}

export function BreakdownName(props: BreakdownNameProps) {
  const splittedName = props.name.split(' ');
  const firstName = splittedName[0];
  const lastName = splittedName[1];
  return (
    <div className="breakdown-name">
      <span>{firstName}</span>
      <span>{lastName}</span>
    </div>
  );
}
