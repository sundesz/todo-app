import { INotificationState } from '../action-types';
import { NotificationAction } from '../actions';

const initialState: INotificationState = {
  message: '',
  type: '',
};

export const notificationReducer = (
  state = initialState,
  action: NotificationAction
): INotificationState => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'RESET_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};
