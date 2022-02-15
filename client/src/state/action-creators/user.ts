import { Dispatch } from 'redux';
import { catchError, displayNotification } from '.';
import * as Service from '../../services';
import { INewUserValues, ISignInValues, ITask } from '../../types';
import { TaskActionType, UserActionType } from '../action-types';

export const createUser = (newUser: INewUserValues) => {
  // return async (dispatch: Dispatch<UserAction>) => {
  return async (dispatch: Dispatch) => {
    try {
      const savedUser = await Service.createUser(newUser);
      const userInfo = await Service.signIn({
        username: savedUser.username,
        password: newUser.password,
      });

      signInDispatch(dispatch, userInfo, true);

      displayNotification(dispatch, {
        message: 'User created successfully',
        type: 'success',
      });
    } catch (error) {
      catchError(error, dispatch);
    }
  };
};

export const refetchToken = () => {
  return async (dispatch: Dispatch) => {
    try {
      const newToken = await Service.refreshToken();

      if (newToken !== '') {
        signInDispatch(dispatch, newToken, true);
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Network Error') {
        displayNotification(dispatch, {
          message: 'Please start server first to use this app.',
          type: 'danger',
        });
      }
    }
  };
};

export const signIn = (user: ISignInValues) => {
  return async (dispatch: Dispatch) => {
    try {
      const userInfo = await Service.signIn({
        username: user.username,
        password: user.password,
      });

      signInDispatch(dispatch, userInfo, true);
      displayNotification(dispatch, {
        message: 'Sign in successfully',
        type: 'success',
      });
    } catch (error) {
      catchError(error, dispatch);
    }
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch) => {
    try {
      await Service.signOut();
      dispatch({ type: UserActionType.UNSET_USER });

      displayNotification(dispatch, {
        message: 'Sign out successfully',
        type: 'success',
      });
    } catch (error: unknown) {
      catchError(error, dispatch);
    }
  };
};

const signInDispatch = (
  dispatch: Dispatch,
  user: { username: string; token: string; tasks: ITask[] },
  isAuthenticated: boolean
) => {
  dispatch({ type: UserActionType.SET_USER, payload: user.username });
  dispatch({ type: UserActionType.SET_TOKEN, payload: user.token });
  dispatch({ type: UserActionType.IS_AUTHENTICATE, payload: isAuthenticated });
  dispatch({ type: TaskActionType.SET_TASKS, payload: user.tasks });
};
