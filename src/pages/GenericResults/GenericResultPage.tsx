import React, { Fragment } from 'react';
import {
  RoomType,
  PlayerGameStatus
} from '../../types/typesIndex';
import { BoxLoader } from '../../components/boxLoader/boxLoader';
import { TypingTestResultPage, MultiplayerResultPage } from '../pagesIndex';
import Button from '@material-ui/core/Button';

export interface GenericResultPageProps {
  roomType: RoomType;
  roomId: string;
  players: PlayerGameStatus[] | PlayerGameStatus;
  fetchReplay: any;
  myId: string;
}

export class GenericResultPage extends React.Component<
  GenericResultPageProps,
  any
> {
  constructor(props: GenericResultPageProps) {
    super(props);
    props.fetchReplay(props.roomId, props.myId);
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
            // @ts-ignore
            data={this.props.players}
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
          <FooterButton rootClass="color-1 multiplayer-button">
            Multiplayer
          </FooterButton>
        </section>
      </div>
    );
  }
}
interface FooterButtonProps {
  children: any;
  rootClass?: string;
}
function FooterButton(props: FooterButtonProps) {
  const buttonClasses = {
    root: `footer-button ${props.rootClass || ''}`
  };
  return (
    <Button variant="contained" fullWidth classes={buttonClasses}>
      {props.children}
    </Button>
  );
}
