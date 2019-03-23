import { format } from 'date-fns';

/**
 *  helper class for time transformations.
 */

export class TimeManager {
  private static instance: TimeManager;
  static formattedTime(timestamp: any) {
    return format(timestamp, 'D MMM,HH:mm');
  }
}
