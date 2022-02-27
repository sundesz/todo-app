import { headerRequest } from '.';
import axios from '../axios';
import { INewUserValues, ISignInValues } from '../types';

/**
 * Cannot save token in cookies as every time browser refresh token disappears so need to use localStorage
 */

export const createUser = async (newUser: INewUserValues) => {
  const response = await axios.post('users', newUser);
  return response.data;
};

export const signIn = async (user: ISignInValues) => {
  const response = await axios.post('login', user, headerRequest());
  return response.data;
};

export const signOut = async () => {
  await axios.post('logout', {}, headerRequest());
};

export const refreshToken = async () => {
  const response = await axios.post('refresh', {}, headerRequest());
  return response.data;
};

export const getCSRFToken = async () => {
  try {
    const response = await axios.get('csrfToken');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
