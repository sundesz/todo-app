import { headerRequest } from '.';
import axios from '../axios';
import { BASE_URL } from '../config';
import { INewUserValues, ISignInValues } from '../types';

export const createUser = async (newUser: INewUserValues) => {
  console.log(BASE_URL);
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
