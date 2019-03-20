/**
 *  helper class for doing common navigation operations.
 */
import { ROOM_TYPE_PARAM } from 'src/constants';
import { iosShowKeyboard } from 'src/middlewares/IosShowKeyboard';
import { RoomType } from 'src/types/typesIndex';

export class TCNavigator {
  private static instance: TCNavigator;
  history: any;
  private constructor(history: any) {
    this.history = history;
  }
  navigateToMultiplayer = () => {
    iosShowKeyboard.showKeyboard(() =>
      this.history.push(`/game?${ROOM_TYPE_PARAM}=${RoomType.MULTIPLAYER}`)
    );
  };
  navigateToTypingTest = () => {
    iosShowKeyboard.showKeyboard(() => {
      this.history.push(`/game?${ROOM_TYPE_PARAM}=${RoomType.TYPING_TEST}`);
    });
  };
  static initNavigators(history: any) {
    TCNavigator.instance = new TCNavigator(history);
  }
  static getInstance(): TCNavigator {
    return TCNavigator.instance;
  }
}
