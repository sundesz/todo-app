import { NotificationActionType, INotificationState } from '../action-types';

export interface ISetNotificationAction {
  type: NotificationActionType.SET_NOTIFICATION;
  payload: INotificationState;
}

export interface IResetNotificationAction {
  type: NotificationActionType.RESET_NOTIFICATION;
}

export type NotificationAction =
  | ISetNotificationAction
  | IResetNotificationAction;
