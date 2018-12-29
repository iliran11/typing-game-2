import React from 'react';
import './homepage.css';
import Keyboard from '../../components/keyboard/keyboard';
const baseSteps = [
  {
    text: 'y',
    keyboard: [0, 5]
  },
  { text: 'yo', keyboard: [0, 9] },
  { text: 'you', keyboard: [0, 7] },
  { text: 'your', keyboard: [0, 3] },
  { text: 'your ', keyboard: [3, 3] },
  { text: 'your f', keyboard: [1, 3] },
  { text: 'your fr', keyboard: [0, 3] },
  { text: 'your fri', keyboard: [0, 8] },
  { text: 'your frie', keyboard: [0, 2] },
  { text: 'your frien', keyboard: [2, 6] },
  { text: 'your friend', keyboard: [1, 2] },
  { text: 'your friends', keyboard: [1, 1] },
  { text: 'your friends', keyboard: [-1, -1] }
];

const BaseTitle = (props: any) => {
  return (
    <p>
      <span>Improve your typing skills,</span>
      <br />
      <span>by racing with&nbsp;</span>
      <span>{props.text}</span>
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
  constructor(props: Props) {
    super(props);
    this.state = {
      step: 0
    };

    this.incrementStep = this.incrementStep.bind(this);
  }
  componentDidMount() {
    setTimeout(this.incrementStep);
  }
  incrementStep() {
    this.setState(
      {
        step: this.state.step + 1
      },
      () => {
        if (this.state.step < baseSteps.length - 1) {
          setTimeout(this.incrementStep, 300);
        }
      }
    );
  }
  navigateToGame() {
    this.props.history.push('/game');
  }
  render() {
    const text = 'text';
    const currentStep = baseSteps[this.state.step];
    return (
      <div id="home-page">
        <BaseTitle text={currentStep[text]} />
        <Keyboard
          row={currentStep.keyboard[0]}
          letter={currentStep.keyboard[1]}
        />
        <button
          id="compete-now"
          className="button-large gradient-5"
          onClick={this.navigateToGame}
        >
          Compete Now
        </button>
      </div>
    );
  }
  // return <div id="home-page"><button onClick={navigateToGame}>Start!</button></div>;
}
