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
  const response = await axios.post('login', user);
  localStorage.setItem('userToken', response.data.token);
  return response.data;
};

export const signOut = async () => {
  localStorage.removeItem('userToken');
  await axios.post('logout');
};

export const refreshToken = async () => {
  const token = localStorage.getItem('userToken');
  const response = await axios.post('refreshtoken', { token });

  if (response.data.token === undefined) {
    localStorage.removeItem('userToken');
  } else {
    localStorage.setItem('userToken', response.data.token);
  }
  return response.data;
};
