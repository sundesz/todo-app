import { NotificationActionType, NotificationState } from '../action-types';

export type NotificationAction =
  | {
      type: NotificationActionType.SET_NOTIFICATION;
      payload: NotificationState;
    }
  | { type: NotificationActionType.RESET_NOTIFICATION };
