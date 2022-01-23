import { NotificationState } from '../action-types';
import { NotificationAction } from '../actions';

const initialState: NotificationState = {
  message: '',
  type: '',
};

export const notificationReducer = (
  state = initialState,
  action: NotificationAction
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'RESET_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};
