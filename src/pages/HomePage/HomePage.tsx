import React from 'react';
import './homepage.scss';
import { RoomType } from '../../types/typesIndex';
import { ROOM_TYPE_PARAM } from '../../constants';
import Button from '@material-ui/core/Button';
import Keyboard from '../../components/keyboard/keyboard';
const baseSteps = [
  {
    text: 'y',
    keyboard: [0, 5]
  },
  { text: 't         ', keyboard: [0, 9] },
  { text: 'ty          ', keyboard: [0, 7] },
  { text: 'typ         ', keyboard: [0, 3] },
  { text: 'typi        ', keyboard: [3, 3] },
  { text: 'typin       ', keyboard: [1, 3] },
  { text: 'typing      ', keyboard: [0, 3] },
  { text: 'typing s    ', keyboard: [0, 8] },
  { text: 'typing sk   ', keyboard: [0, 2] },
  { text: 'typing skil ', keyboard: [2, 6] },
  { text: 'typing skill', keyboard: [1, 2] },
  { text: 'typing skills', keyboard: [1, 1] }
];

const BaseTitle = (props: any) => {
  return (
    <p>
      <span>Improve your</span>
      <span />
      <span>
        <br />
        {props.text}
      </span>
    </p>
  );
};

interface Props {
  history: any;
  initAuthenticationManager: any;
}
interface State {
  step: number;
}

export default class Home extends React.Component<Props, State> {
  virtualKeyboardTimer: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      step: 0
    };
    this.navigateToGame = this.navigateToGame.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
    this.navigateToTypingTest = this.navigateToTypingTest.bind(this);
  }
  componentDidMount() {
    this.virtualKeyboardTimer = setTimeout(this.incrementStep);
  }
  componentWillUnmount() {
    window.clearTimeout(this.virtualKeyboardTimer);
  }
  incrementStep() {
    this.setState(
      {
        step: this.state.step + 1
      },
      () => {
        if (this.state.step < baseSteps.length - 1) {
          this.virtualKeyboardTimer = setTimeout(this.incrementStep, 300);
        }
      }
    );
  }
  navigateToGame() {
    this.props.history.push(`/game?${ROOM_TYPE_PARAM}=${RoomType.MULTIPLAYER}`);
  }
  navigateToTypingTest() {
    this.props.history.push(`/game?${ROOM_TYPE_PARAM}=${RoomType.TYPING_TEST}`);
  }
  classes = {
    root: 'home-page-button'
  };
  render() {
    const text = 'text';
    const currentStep = baseSteps[this.state.step];
    return (
      <div id="home-page" className="page">
        <BaseTitle text={currentStep[text]} />
        <Keyboard
          row={currentStep.keyboard[0]}
          letter={currentStep.keyboard[1]}
        />
        <div className="buttons">
          <Button
            variant="raised"
            classes={this.classes}
            onClick={this.navigateToGame}
          >
            Multiplayer
          </Button>
          <Button
            variant="raised"
            classes={this.classes}
            onClick={this.navigateToTypingTest}
          >
            Typing Test
          </Button>
        </div>
      </div>
    );
  }
  // return <div id="home-page"><button onClick={navigateToGame}>Start!</button></div>;
}
