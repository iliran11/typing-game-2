import * as React from 'react';
import ActiveUserAvatar from '../../components/UserAvatar/ActiveUserAvatarContainer';

interface ProgressSummaryProps {
  level: number;
  rank: number;
}

const ProgressSummary: React.SFC<ProgressSummaryProps> = props => {
  return (
    <div id="ranking">
      <div className="ranking-section">
        <span className="big-header">{`Level ${props.level}`}</span>
        <span className="info-footer">the difficulty of the text</span>
      </div>
      <ActiveUserAvatar onClick={() => {}} />
      <div className="ranking-section">
        <span className="big-header">{props.rank}</span>
        <span className="info-footer">Your rank in app</span>
      </div>
    </div>
  );
};

export default ProgressSummary;
