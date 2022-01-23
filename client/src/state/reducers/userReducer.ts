import { UserActionType, UserState } from '../action-types';
import { UserAction } from '../actions';

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  authentication: false,
};

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionType.USER_SET_LOADING:
      return action.payload;
    case UserActionType.SET_USER:
      return { ...state, user: action.payload };
    case UserActionType.UNSET_USER:
      return initialState;
    case UserActionType.SET_TOKEN:
      return { ...state, token: action.payload };
    case UserActionType.IS_AUTHENTICATE:
      return { ...state, authentication: action.payload };
    case UserActionType.REFRESH_TOKEN:
      return state;
    default:
      return state;
  }
};
