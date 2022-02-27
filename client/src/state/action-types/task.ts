import { ITask } from '../../types';

export enum TaskActionType {
  SET_TASKS = 'SET_TASKS',
  UNSET_TASKS = 'UNSET_TASKS',
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

export interface ITaskState {
  tasks: ITask[];
  loading: boolean;
}
