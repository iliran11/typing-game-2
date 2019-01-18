import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { LevelConfigI, levelConfig, getExampleByLevel } from './LevelConfig';

export interface SetupLevelProps {
  updateCustomLevel: any;
  level: number;
}

export interface SetupLevelState {
  customLevel: number;
}

export default class SetupLevel extends React.Component<
  SetupLevelProps,
  SetupLevelState
> {
  constructor(props: SetupLevelProps) {
    super(props);

    this.state = {
      customLevel: props.level
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event: any) {
    const newLevel = parseInt(event.target.value);
    this.setState({ customLevel: newLevel });
    this.props.updateCustomLevel(newLevel);
  }
  public render() {
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
            // @ts-ignore
            value={this.state.customLevel.toString()}
            onChange={this.handleChange}
          >
            {levelConfig.map((levelConfigItem, index) => {
              return (
                <FormControlLabel
                  // @ts-ignore
                  value={levelConfigItem.value.toString()}
                  control={
                    <Radio
                      checked={levelConfigItem.value == this.state.customLevel}
                      // disabled={this.props.level < currentLevel}
                      disabled={false}
                    />
                  }
                  label={levelConfigItem.label}
                  key={levelConfigItem.value}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        {getExampleByLevel(this.state.customLevel)}
      </div>
    );
  }
}
