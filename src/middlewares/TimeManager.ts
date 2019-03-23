import { format } from 'date-fns';

/**
 *  helper class for time transformations.
 */

export class TimeManager {
  private static instance: TimeManager;
  static formattedTime(timestamp: any) {
    return format(timestamp, 'D MMM,HH:mm');
  }
  // 544547 to 09:45  , 9 minutes and 45 seconds.
  static millisecondsToTimeFormat(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const remainedMilliseconds = milliseconds - minutes * 60000;
    const seconds = Math.floor(remainedMilliseconds / 1000);
    return `${TimeManager.number2Digits(minutes)}:${TimeManager.number2Digits(
      seconds
    )}`;
  }
  static number2Digits(number: number): string {
    if (number < 10) return `0${number}`;
    return `${number}`;
  }
}
