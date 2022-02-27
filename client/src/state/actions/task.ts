import { ITask } from '../../types';
import { TaskActionType } from '../action-types';

export interface ISetTaskAction {
  type: TaskActionType.SET_TASKS;
  payload: ITask[];
}

export interface IUnsetTaskAction {
  type: TaskActionType.UNSET_TASKS;
  payload: ITask;
}

export interface ICreateTaskAction {
  type: TaskActionType.CREATE_TASK;
  payload: ITask;
}

export interface IUpdateTaskAction {
  type: TaskActionType.UPDATE_TASK;
  payload: ITask;
}

export interface IDeleteTaskAction {
  type: TaskActionType.DELETE_TASK;
  payload: string;
}

export type TaskAction =
  | ISetTaskAction
  | IUnsetTaskAction
  | ICreateTaskAction
  | IUpdateTaskAction
  | IDeleteTaskAction;
