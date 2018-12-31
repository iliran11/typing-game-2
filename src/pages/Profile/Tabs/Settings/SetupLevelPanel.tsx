import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { GameLevel } from '../../../../types';

export interface SetupLevelProps {}

export interface SetupLevelState {
  value: string;
}

interface LevelConfig {
  value: GameLevel;
  label: string;
  example: JSX.Element;
}
const config: LevelConfig[] = [
  {
    value: GameLevel.LEVEL1,
    label: 'Level 1',
    example: (
      <p>
        people who succeed have momentum the more they succeed the more they
        want to succeed the more they find a way to succeed
      </p>
    )
  },
  {
    value: GameLevel.LEVEL2,
    label: 'Level 2',
    example: (
      <p>
        <span className="green bold">P</span>eople who succeed have momentum{' '}
        <span className="green bold">T</span>he more they succeed the more they
        want to succeed the more they find a way to succeed
      </p>
    )
  },
  {
    value: GameLevel.LEVEL3,
    label: 'Level 3',
    example: (
      <p>
        <span className="green bold">P</span>eople who succeed have momentum
        <span className="green bold">. T</span>he more they succeed
        <span className="green bold">,</span> the more they want to succeed, the
        more they find a way to succeed<span className="green bold">.</span>
      </p>
    )
  },
  {
    value: GameLevel.LEVEL4,
    label: 'Level 4',
    example: (
      <p>
        <span className="green bold">21 P</span>eople who succeed have momentum
        <span className="green bold"> . T</span>he more they succeed, the more
        they want to succeed<span className="green bold">,</span> the more they
        find a way to succeed<span className="green bold">.</span>
      </p>
    )
  },
  {
    value: GameLevel.LEVEL5,
    label: 'Level 5',
    example: (
      <p>
        <span className="green bold">21 P</span>eople who succeed have momentum
        <span className="green bold">. T</span>he more they succeed
        <span className="green bold">,</span> the more they want to succeed, the
        more they find a way to succeed.
        <span className="green bold">. ^_^</span>
      </p>
    )
  }
];

function getIndexByLevel(value: string): LevelConfig {
  const findResult = config.find(config => {
    return config.value === value;
  });
  if (findResult) {
    // @ts-ignore
    return findResult;
  } else {
    return config[0];
  }
}
export default class SetupLevel extends React.Component<
  SetupLevelProps,
  SetupLevelState
> {
  constructor(props: SetupLevelProps) {
    super(props);

    this.state = {
      value: GameLevel.LEVEL1
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }
  public render() {
    console.log(getIndexByLevel(this.state.value).example);
    return (
      <div>
        <FormControl>
          <FormLabel focused={false}>
            <p>
              You can choose the level that suits you. The level you choose
              affects the texts you type in the game
            </p>
            <p>see example below</p>
          </FormLabel>
          <RadioGroup
            aria-label="Level"
            name="Level"
            // className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {config.map(levelConfig => {
              return (
                <FormControlLabel
                  value={levelConfig.value}
                  control={<Radio />}
                  label={levelConfig.label}
                  key={levelConfig.value}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        {getIndexByLevel(this.state.value).example}
      </div>
    );
  }
}
