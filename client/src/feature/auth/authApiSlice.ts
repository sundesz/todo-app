import { apiSlice } from '../../app/api/apiSlice';
import { ILogin, ILoginResponse } from '../../types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILogin>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['Tasks'],
    }),

    refreshToken: builder.query<ILoginResponse, void>({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const { useRefreshTokenQuery, useLogoutMutation, useLoginMutation } =
  authApiSlice;
