import { combineReducers } from 'redux';
import { taskReducer } from './taskReducer';
import { userReducer } from './userReducer';
import { notificationReducer } from './notificationReducer';

export const reducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  notification: notificationReducer,
});
