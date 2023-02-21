import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../../feature/auth/authSlice';
import { RootState } from '../store';
export const BASE_URL = '/api/v1';
// const BASE_URL = 'http://localhost:8080/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  // `arg` has the type `string`
  // `api` has the type `BaseQueryApi` (not configurable)
  // `extraOptions` has the type `{ shout?: boolean }
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // send refresh token to get new access token

    const refreshResult = await baseQuery('/refresh', api, extraOptions);

    if (refreshResult?.data) {
      const userInfo = (api.getState() as RootState).auth.userInfo;

      // store the new token
      api.dispatch(setCredentials({ accessToken: 'fsa', userInfo: userInfo! }));
      // api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tasks', 'User'],
  endpoints: (builder) => ({}),
});
