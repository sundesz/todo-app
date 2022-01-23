import { ITask } from '../../types';
import { TaskActionType } from '../action-types';

export type TaskAction =
  | { type: TaskActionType.SET_TASKS; payload: ITask }
  | { type: TaskActionType.UNSET_TASKS; payload: ITask }
  | { type: TaskActionType.CREATE_TASK; payload: ITask }
  | { type: TaskActionType.UPDATE_TASK; payload: ITask }
  | { type: TaskActionType.DELETE_TASK; payload: string };
