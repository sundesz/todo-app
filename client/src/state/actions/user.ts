import { UserActionType } from '../action-types';

export type UserAction =
  | { type: UserActionType.USER_SET_LOADING; payload: boolean }
  | { type: UserActionType.SET_USER; payload: string }
  | { type: UserActionType.SET_TOKEN; payload: string }
  | { type: UserActionType.UNSET_USER }
  | { type: UserActionType.IS_AUTHENTICATE; payload: boolean }
  | { type: UserActionType.REFRESH_TOKEN; payload: string };
