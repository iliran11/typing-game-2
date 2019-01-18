import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { levelConfig, getExampleByLevel } from './LevelConfig';
import {
  SimpleSnackbarWrapper,
  SimpleSnackbarWrapperProps
} from '../../../../components/SimpleSnackbarWrapper/SimpleSnackbarWrapper';
import classes from '*.module.css';

export interface SetupLevelProps {
  updateCustomLevel: any;
  level: number;
}

export interface SetupLevelState {
  customLevel: number;
  isSnackbarOpen: boolean;
  serverResponse: ServerResponse;
}

enum ServerResponse {
  SUCCESS = 'success',
  FAILURE = 'failure',
  NONE = 'NONE'
}

export default class SetupLevel extends React.Component<
  SetupLevelProps,
  SetupLevelState
> {
  constructor(props: SetupLevelProps) {
    super(props);

    this.state = {
      customLevel: props.level,
      isSnackbarOpen: false,
      serverResponse: ServerResponse.NONE
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSnackbarClose = this.onSnackbarClose.bind(this);
  }
  handleChange(event: any) {
    const newLevel = parseInt(event.target.value);
    this.setState({ customLevel: newLevel });
    this.props
      .updateCustomLevel(newLevel)
      .then(() => {
        this.setState({
          isSnackbarOpen: true,
          serverResponse: ServerResponse.SUCCESS
        });
      })
      .catch(() => {
        this.setState({
          isSnackbarOpen: true,
          serverResponse: ServerResponse.FAILURE
        });
      });
  }
  onSnackbarClose() {
    this.setState({
      isSnackbarOpen: false
    });
  }
  get snackbarClasses(): object {
    if (this.state.serverResponse === ServerResponse.SUCCESS) {
      return { root: 'snackbar-success' };
    } else {
      return { root: 'snackbar-failure' };
    }
  }
  get snackbarMessage(): string {
    if (this.state.serverResponse === ServerResponse.SUCCESS) {
      return `Level changed to ${this.state.customLevel} ✅`;
    } else {
      // TODO: this should be handled globally ...
      return 'something went wrong ... ';
    }
  }
  get snackbarProps(): SimpleSnackbarWrapperProps {
    return {
      open: this.state.isSnackbarOpen,
      onClose: this.onSnackbarClose,
      classes: this.snackbarClasses,
      message: this.snackbarMessage
    };
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
            value={this.state.customLevel.toString()}
            onChange={this.handleChange}
          >
            {levelConfig.map((levelConfigItem, index) => {
              return (
                <FormControlLabel
                  value={levelConfigItem.value.toString()}
                  control={
                    <Radio
                      checked={levelConfigItem.value == this.state.customLevel}
                      disabled={this.props.level < levelConfigItem.value}
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
        <SimpleSnackbarWrapper {...this.snackbarProps} />
      </div>
    );
  }
}
