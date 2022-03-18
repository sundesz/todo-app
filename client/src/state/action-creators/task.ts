import { Dispatch } from 'redux';
import { TaskActionType } from '../action-types';
import * as Service from '../../services';
import { ITask, INewTask } from '../../types';
import { catchError, displayNotification } from '.';
import { NotificationAction, TaskAction } from '../actions';

export type TaskAndNotificationAction = TaskAction | NotificationAction;

export const createTask = (task: INewTask) => {
  return async (dispatch: Dispatch<TaskAndNotificationAction>) => {
    try {
      const newTask = await Service.createTask(task);
      dispatch({ type: TaskActionType.CREATE_TASK, payload: newTask });
      displayNotification(dispatch, {
        message: 'Task created successfully',
        type: 'success',
      });
    } catch (error) {
      catchError(error, dispatch);
    }
  };
};

export const updateTask = (
  taskId: string,
  body: { isCompleted: boolean; important: boolean }
) => {
  return async (dispatch: Dispatch<TaskAndNotificationAction>) => {
    try {
      const response: ITask = await Service.updateTask(taskId, body);

      dispatch({ type: TaskActionType.UPDATE_TASK, payload: response });
      displayNotification(dispatch, {
        message: 'Task updated successfully',
        type: 'success',
      });
    } catch (error) {
      catchError(error, dispatch);
    }
  };
};

export const deleteTask = (taskId: string) => {
  return async (dispatch: Dispatch<TaskAndNotificationAction>) => {
    try {
      await Service.deleteTask(taskId);
      dispatch({ type: TaskActionType.DELETE_TASK, payload: taskId });
      displayNotification(dispatch, {
        message: 'Task deleted successfully',
        type: 'success',
      });
    } catch (error) {
      catchError(error, dispatch);
    }
  };
};
