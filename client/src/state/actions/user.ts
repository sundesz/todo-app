import { UserActionType } from '../action-types';

export interface IUserSetLoadingAction {
  type: UserActionType.USER_SET_LOADING;
  payload: boolean;
}

export interface ISetUserAction {
  type: UserActionType.SET_USER;
  payload: string;
}

export interface IUnsetUserAction {
  type: UserActionType.UNSET_USER;
}

export interface ISetAuthenticationAction {
  type: UserActionType.IS_AUTHENTICATE;
  payload: boolean;
}

export type UserAction =
  | IUserSetLoadingAction
  | ISetUserAction
  | IUnsetUserAction
  | ISetAuthenticationAction;
