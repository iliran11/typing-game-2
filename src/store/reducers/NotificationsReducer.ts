import { SHOW_SNACKBAR } from '../../constants';
import { NotificationsReducerI, SnackbarPayloadI } from '../../types';

// const letters : Letter[] = [new ]

const initialState: NotificationsReducerI = {
  toastType: '',
  toastMessage: ''
};

export default function NotificationsReducer(
  state: NotificationsReducerI = initialState,
  action: any
): NotificationsReducerI {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return handleShowSnackbar(state, action.payload);
    default:
      return state;
  }
}

function handleShowSnackbar(
  state: NotificationsReducerI,
  payload: SnackbarPayloadI
): NotificationsReducerI {
  return {
    toastType: payload.toastType,
    toastMessage: payload.toastMessage
  };
}
