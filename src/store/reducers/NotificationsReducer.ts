import { SHOW_NOTIFICATION } from '../../constants';
import {
  NotificationSeverityEnum,
  NotificationTypeEnum,
  NotificationsReducerI
} from '../../types';

// const letters : Letter[] = [new ]

const initialState: NotificationsReducerI = {
  notificationType: NotificationTypeEnum.NONE,
  notificationMessage: '',
  notificationSeverity: NotificationSeverityEnum.NONE
};

export default function NotificationsReducer(
  state: NotificationsReducerI = initialState,
  action: any
): NotificationsReducerI {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return handleShowSnackbar(state, action.payload);
    default:
      return state;
  }
}

function handleShowSnackbar(
  state: NotificationsReducerI,
  payload: NotificationsReducerI
): NotificationsReducerI {
  return {
    ...payload
  };
}
