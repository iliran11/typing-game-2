import * as React from 'react';
import { TCCard } from 'src/components/ComponentsIndex';
import { DeviceType } from 'src/types/typesIndex';
import { ScoreSections } from 'src/components/ComponentsIndex';
import FilledUser from 'src/assets/user-avatar/filled-user.svg';
import OutlineUser from 'src/assets/user-avatar/outline-user.svg';
import cx from 'classnames';

export interface CompareResultsProps {}

export interface CompareResultsProps {
  wordsMin: number;
  charsMin: number;
  accuracy: number;
  deviceType: DeviceType;
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
      Math.round(calculatePercentile(props.wordsMin, props.deviceType) * 100) /
        10
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
      return <img src={FilledUser} className={className} key={index} />;
    } else {
      return <img src={OutlineUser} className={className} key={index} />;
    }
  };
  public render() {
    return (
      <TCCard title="Your best scores" className="profile-card">
        <ScoreSections
          data={[
            { value: Math.round(this.props.wordsMin), label: 'WORDS/MIN' },
            { value: Math.round(this.props.charsMin), label: 'CHARS' },
            { value: this.accuracy, label: 'ACCURACY' }
          ]}
        />
        <div className="comparison-avatars-list">
          {this.comparisonAvatars.map(this.renderAvatar)}
        </div>
        <p className="text-center color-1">
          you type faster than{' '}
          {calculatePercentile(this.props.wordsMin, this.props.deviceType) * 10}
          /10 of users
        </p>
      </TCCard>
    );
  }
}

function calculatePercentile(wpm: number, deviceType: DeviceType): number {
  switch (deviceType) {
    case DeviceType.DESKTOP: {
      if (wpm < 20) return 0.1;
      else if (wpm > 20 && wpm < 25) return 0.2;
      else if (wpm > 25 && wpm < 29) return 0.3;
      else if (wpm > 29 && wpm < 33) return 0.4;
      else if (wpm > 33 && wpm < 37) return 0.5;
      else if (wpm > 37 && wpm < 43) return 0.6;
      else if (wpm > 43 && wpm < 48) return 0.7;
      else if (wpm > 48 && wpm < 55) return 0.8;
      else if (wpm > 55 && wpm < 63) return 0.9;
      else return 1;
    }
    case DeviceType.MOBILE: {
      if (wpm < 11) return 0.1;
      else if (wpm > 11 && wpm < 14) return 0.2;
      else if (wpm > 14 && wpm < 17) return 0.3;
      else if (wpm > 17 && wpm < 19) return 0.4;
      else if (wpm > 19 && wpm < 22) return 0.5;
      else if (wpm > 22 && wpm < 25) return 0.6;
      else if (wpm > 25 && wpm < 28) return 0.7;
      else if (wpm > 28 && wpm < 32) return 0.8;
      else if (wpm > 32 && wpm < 36) return 0.9;
      else return 1;
    }
    default:
      throw new Error('unknown platform');
  }
}
