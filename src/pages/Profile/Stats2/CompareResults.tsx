import * as React from 'react';
import { TCCard } from 'src/components/ComponentsIndex';
import { ScoreSections } from 'src/components/ComponentsIndex';
import { ReactComponent as FilledUser } from 'src/assets/user-avatar/filled-user.svg';
import { ReactComponent as OutlineUser } from 'src/assets/user-avatar/outline-user.svg';
import cx from 'classnames';

export interface CompareResultsProps {}

export interface CompareResultsProps {
  wordsMin: number;
  charsMin: number;
  accuracy: number;
  percentile: number;
  // you are better than: 0.58 of the population.
}
interface AvatarData {
  filled: boolean;
}
export class CompareResults extends React.Component<CompareResultsProps, any> {
  comparisonAvatars: AvatarData[];
  numberOfFilledAvatars: number;
  constructor(props: CompareResultsProps) {
    super(props);
    this.numberOfFilledAvatars = Math.round(
      Math.round(props.percentile * 100) / 10
    );
    // count the number of already filled avatars.
    let filledAvatars = 0;
    this.comparisonAvatars = new Array(10).fill(null).map((value, index) => {
      const isFilled = this.numberOfFilledAvatars > filledAvatars;
      filledAvatars++;
      return {
        filled: isFilled
      };
    });
  }
  static defaultProps = {
    wordsMin: 50,
    charsMin: 121,
    accuracy: 0.9,
    percentile: 0.8
  };
  get accuracy() {
    return `${Math.round(this.props.accuracy * 100)}%`;
  }
  renderAvatar = (data: AvatarData, index: number) => {
    const className = cx('comparison-avatar', { filled: data.filled });
    if (data.filled) {
      return <FilledUser className={className} key={index} />;
    } else {
      return <OutlineUser className={className} key={index} />;
    }
  };
  public render() {
    return (
      <TCCard title="Your best scores" className="profile-card">
        <ScoreSections
          data={[
            { value: this.props.wordsMin, label: 'WORDS/MIN' },
            { value: this.props.charsMin, label: 'CHARS' },
            { value: this.accuracy, label: 'ACCURACY' }
          ]}
        />
        <div className="comparison-avatars-list">
          {this.comparisonAvatars.map(this.renderAvatar)}
        </div>
        <p className="text-center color-1">
          you type faster than {this.numberOfFilledAvatars}/10 of users
        </p>
      </TCCard>
    );
  }
}
