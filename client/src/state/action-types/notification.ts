export enum NotificationActionType {
  SET_NOTIFICATION = 'SET_NOTIFICATION',
  RESET_NOTIFICATION = 'RESET_NOTIFICATION',
}

export interface INotificationState {
  message: string;
  type: string;
}
