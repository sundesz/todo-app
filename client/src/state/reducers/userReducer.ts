import { UserActionType, IUserState } from '../action-types';
import { UserAction } from '../actions';

const initialState: IUserState = {
  user: null,
  loading: false,
  authentication: false,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case UserActionType.USER_SET_LOADING:
      return { ...state, loading: action.payload };
    case UserActionType.SET_USER:
      return { ...state, user: action.payload };
    case UserActionType.UNSET_USER:
      return initialState;
    case UserActionType.IS_AUTHENTICATE:
      return { ...state, authentication: action.payload };
    default:
      return state;
  }
};
