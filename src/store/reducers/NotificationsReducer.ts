import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../../constants';
import { NotificationsReducerI, NotificationTypes } from '../../types';

// const letters : Letter[] = [new ]

const initialState: NotificationsReducerI = {
  notificationType: NotificationTypes.NONE
};

export default function NotificationsReducer(
  state: NotificationsReducerI = initialState,
  action: any
): NotificationsReducerI {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return handleShowSnackbar(state, action.payload);
    case HIDE_NOTIFICATION:
      return {
        notificationType: NotificationTypes.NONE
      };
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
