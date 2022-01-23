import { Dispatch } from 'redux';
import { displayNotification, setNotification } from '.';
import * as Service from '../../services';
import { INewUserValues, ISignInValues, ITask } from '../../types';
import { TaskActionType, UserActionType } from '../action-types';

// TODO:  Cannot show appropriate message as in catch block as  I couldn't access error.response.data

export const createUser = (newUser: INewUserValues) => {
  // return async (dispatch: Dispatch<UserActionType>) => {
  return async (dispatch: Dispatch) => {
    try {
      const savedUser = await Service.createUser(newUser);
      const userInfo = await Service.signIn({
        username: savedUser.username,
        password: newUser.password,
      });

      signInDispatch(dispatch, userInfo, true);
      dispatch(
        setNotification({
          message: 'User created successfully',
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

export const refetchToken = () => {
  return async (dispatch: Dispatch) => {
    try {
      const newToken = await Service.refreshToken();

      if (newToken !== '') {
        signInDispatch(dispatch, newToken, true);
      }
    } catch (error) {
      if (error instanceof Error) {
        const message =
          error.message === 'Network Error'
            ? 'Please start server first to use this app.'
            : error.message;
        dispatch(setNotification({ message, type: 'danger' }));
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
      dispatch(
        setNotification({ message: 'Sign in successfully', type: 'success' })
      );
      displayNotification({
        message: 'Sign in successfully',
        type: 'success',
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setNotification({ message: error.message, type: 'danger' }));
      }
    }
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch) => {
    await Service.signOut();
    try {
      dispatch({ type: UserActionType.UNSET_USER });
      dispatch(
        setNotification({ message: 'Sign out successfully', type: 'success' })
      );
      displayNotification({
        message: 'Sign out successfully displayNotification',
        type: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(setNotification({ message: error.message, type: 'danger' }));
      }
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
