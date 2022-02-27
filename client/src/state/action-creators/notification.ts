import { Dispatch } from 'redux';
import { NotificationActionType, INotificationState } from '../action-types';
import {
  IResetNotificationAction,
  ISetNotificationAction,
  NotificationAction,
} from '../actions';

let notificationTimeoutID: ReturnType<typeof setTimeout>;

export const setNotification = (
  notification: INotificationState
): ISetNotificationAction => ({
  type: NotificationActionType.SET_NOTIFICATION,
  payload: notification,
});

export const resetNotification = (): IResetNotificationAction => ({
  type: NotificationActionType.RESET_NOTIFICATION,
});

export const displayNotification = async (
  dispatch: Dispatch<NotificationAction>,
  notification: INotificationState
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
