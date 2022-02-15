import { Dispatch } from 'redux';
import { TaskActionType } from '../action-types';
import * as Service from '../../services';
import { ITask, INewTask } from '../../types';
import { catchError, displayNotification } from '.';

export const createTask = (task: INewTask, token: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      const newTask = await Service.createTask(task, token);
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

export const updateTaskIsCompleted = (
  taskId: string,
  isCompleted: { isCompleted: boolean },
  token: string | null
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response: ITask = await Service.updateTaskIsCompleted(
        taskId,
        isCompleted,
        token
      );

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

export const deleteTask = (taskId: string, token: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      await Service.deleteTask(taskId, token);
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
