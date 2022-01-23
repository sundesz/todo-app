import { Dispatch } from 'redux';
import { TaskActionType } from '../action-types';
import * as Service from '../../services';
import { ITask, INewTask } from '../../types';
import { setNotification } from '.';


// TODO:  Cannot show appropriate message as in catch block as  I couldn't access error.response.data

export const createTask = (task: INewTask, token: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      const newTask = await Service.createTask(task, token);
      dispatch({ type: TaskActionType.CREATE_TASK, payload: newTask });
      dispatch(
        setNotification({
          message: 'Task created successfully',
          type: 'success',
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setNotification({ message: error.message, type: 'danger' }));
      }
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
      dispatch(
        setNotification({
          message: 'Task updated successfully',
          type: 'success',
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setNotification({ message: error.message, type: 'danger' }));
      }
    }
  };
};

export const deleteTask = (taskId: string, token: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      await Service.deleteTask(taskId, token);
      dispatch({ type: TaskActionType.DELETE_TASK, payload: taskId });
      dispatch(
        setNotification({
          message: 'Task deleted successfully',
          type: 'success',
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setNotification({ message: error.message, type: 'danger' }));
      }
    }
  };
};
