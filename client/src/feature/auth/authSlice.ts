import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ILoginResponse, IUserInfo } from '../../types';
import { BASE_URL } from '../../app/api/apiSlice';

export interface IAuthState {
  userInfo: IUserInfo | null;
  token: string | null;
}

const initialState: IAuthState = {
  userInfo: null,
  token: null,
};

export interface IUnknownError {
  message: string;
}

export const refetchToken = createAsyncThunk<
  ILoginResponse,
  undefined,
  { rejectValue: IUnknownError }
>('auth/refresh', async (_, thunkApi) => {
  const response = await fetch(`${BASE_URL}/refresh`);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch',
    } as IUnknownError);
  }

  return (await response.json()) as ILoginResponse;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      const { userInfo, accessToken } = action.payload;

      state.userInfo = userInfo;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.userInfo = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      refetchToken.fulfilled,
      (state: IAuthState, action: PayloadAction<ILoginResponse>) => {
        const { userInfo, accessToken } = action.payload;
        state.userInfo = userInfo;
        state.token = accessToken;
      }
    );
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) =>
  state.auth.userInfo?.username;
export const selectCurrentToken = (state: RootState) => state.auth.token;
