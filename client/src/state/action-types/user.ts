export enum UserActionType {
  USER_SET_LOADING = 'USER_SET_LOADING',
  SET_USER = 'SET_USER',
  UNSET_USER = 'UNSET_USER',
  IS_AUTHENTICATE = 'IS_AUTHENTICATE',
}

export interface IUserState {
  user: string | null;
  loading: boolean;
  authentication: boolean;
}
