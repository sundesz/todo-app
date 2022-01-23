import { ITask } from '../../types';

export enum UserActionType {
  USER_SET_LOADING = 'USER_SET_LOADING',
  SET_USER = 'SET_USER',
  SET_TOKEN = 'SET_TOKEN',
  UNSET_USER = 'UNSET_USER',
  IS_AUTHENTICATE = 'IS_AUTHENTICATE',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum TaskActionType {
  SET_TASKS = 'SET_TASKS',
  UNSET_TASKS = 'UNSET_TASKS',
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

export enum NotificationActionType {
  SET_NOTIFICATION = 'SET_NOTIFICATION',
  RESET_NOTIFICATION = 'RESET_NOTIFICATION',
}

export interface UserState {
  user: string | null;
  token: string | null;
  loading: boolean;
  authentication: boolean;
}

export interface TaskState {
  tasks: ITask[];
  loading: boolean;
}

export interface NotificationState {
  message: string;
  type: string;
}

export interface IAppState {
  user: UserState;
  task: TaskState;
  notification: NotificationState;
}
