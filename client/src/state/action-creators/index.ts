import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { capitalize } from '../../utils';
import { displayNotification } from './notification';

export * from './user';
export * from './task';
export * from './notification';

export const catchError = (error: unknown, dispatch: Dispatch) => {
  if (axios.isAxiosError(error)) {
    const errorMessage: AxiosError = error;

    const message = errorMessage.response
      ? errorMessage.response.data.error
      : errorMessage.message;

    displayNotification(dispatch, {
      message: capitalize(message),
      type: 'danger',
    });
    return;
  }

  if (error instanceof Error) {
    displayNotification(dispatch, { message: error.message, type: 'danger' });
  }
};
