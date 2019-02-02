import { emitToRoom } from '../utilities';
import { COUNDOWN_CYCLE } from '../../../constants';

class Countdown {
  cycles: number = 5;
  intervalId: any;
  roomName: string;

  constructor(roomName: string) {
    this.intervalId = 0;
    this.roomName = roomName;
  }
  initiateCountdown(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.intervalId = setInterval(() => {
        if (this.cycles > 0) {
          emitToRoom(this.roomName, COUNDOWN_CYCLE, { cycle: this.cycles });
          this.cycles--;
        } else {
          resolve();
          clearInterval(this.intervalId);
        }
      }, 1000);
    });
  }
}

export { Countdown };
