import Button from '@material-ui/core/Button';
import React from 'react';
import { BoxLoader } from 'src/components/ComponentsIndex';
import { ROOM_TYPE_PARAM } from 'src/constants';
import {
  MultiplayerResultPage,
  TypingTestResultPage
} from 'src/pages/pagesIndex';
import { PlayerGameStatus, RoomType } from 'src/types/typesIndex';
import { iosShowKeyboard } from 'src/middlewares/IosShowKeyboard';

export interface GenericResultPageProps {
  roomType: RoomType;
  roomId: string;
  players: PlayerGameStatus[] | PlayerGameStatus;
  fetchReplay: any;
  myId: string;
  history: any;
}

export class GenericResultPage extends React.Component<
  GenericResultPageProps,
  any
> {
  constructor(props: GenericResultPageProps) {
    super(props);
    props.fetchReplay(props.roomId, props.myId);
    this.navigateToMultiplayer = this.navigateToMultiplayer.bind(this);
    this.navigateToHome = this.navigateToHome.bind(this);
  }
  navigateToMultiplayer() {
    iosShowKeyboard.showKeyboard(() => {
      this.props.history.push(
        `/game?${ROOM_TYPE_PARAM}=${RoomType.MULTIPLAYER}`
      );
    });
  }
  navigateToHome() {
    this.props.history.push(`/`);
  }
  public render() {
    if (Array.isArray(this.props.players) && this.props.players.length === 0)
      return <BoxLoader message="getting your result" />;
    if (!this.props.players) {
      return <div>error</div>;
    }
    return (
      <div id="results-page" className="page">
        {this.props.roomType === RoomType.MULTIPLAYER && (
          <MultiplayerResultPage
            roomId={this.props.roomId}
            //@ts-ignore
            players={this.props.players}
            myId={this.props.myId}
          />
        )}
        {this.props.roomType === RoomType.TYPING_TEST && (
          <TypingTestResultPage
            data={this.props.players[0]}
            roomId={this.props.roomId}
          />
        )}
        <section
          id="results-page-footer"
          className="result-page-padding flex-center flex-column"
        >
          <p>
            In registration, you will be able to preserve the results of the
            tests and the results of the game.
          </p>
          <FooterButton rootClass="facebook-background color-white">
            <span>
              Sign up with <span className="bold">Facebook</span>
            </span>
          </FooterButton>
          <p>Check your skills in front of people in real time</p>

          {this.props.roomType === RoomType.TYPING_TEST && (
            <FooterButton
              rootClass="color-1 multiplayer-button"
              onClick={this.navigateToMultiplayer}
            >
              Multiplayer
            </FooterButton>
          )}
          {this.props.roomType === RoomType.MULTIPLAYER && (
            <FooterButton
              rootClass="color-1 multiplayer-button"
              onClick={this.navigateToHome}
            >
              Done
            </FooterButton>
          )}
        </section>
      </div>
    );
  }
}
interface FooterButtonProps {
  children: any;
  rootClass?: string;
  onClick?: any;
}
function FooterButton(props: FooterButtonProps) {
  const buttonClasses = {
    root: `footer-button ${props.rootClass || ''}`
  };
  return (
    <Button
      variant="contained"
      fullWidth
      classes={buttonClasses}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
