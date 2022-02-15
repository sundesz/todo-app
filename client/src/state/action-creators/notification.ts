import { Dispatch } from 'redux';
import { NotificationActionType, NotificationState } from '../action-types';

let notificationTimeoutID: ReturnType<typeof setTimeout>;

export const setNotification = (notification: NotificationState) => ({
  type: NotificationActionType.SET_NOTIFICATION,
  payload: notification,
});

export const resetNotification = () => ({
  type: NotificationActionType.RESET_NOTIFICATION,
});

export const displayNotification = async (
  dispatch: Dispatch,
  notification: NotificationState
) => {
  dispatch(setNotification(notification));
  clearTimeout(notificationTimeoutID);

  await new Promise((resolve) => {
    notificationTimeoutID = setTimeout(
      () => resolve(dispatch(resetNotification())),
      5000
    );
  });

  return notificationTimeoutID;
};
