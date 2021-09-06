import {
  UserActionType,
  IUser,
  CHECK_USER_SESSION,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from './user.types';

interface IDefaultState {
  currentUser: IUser | null;
  loading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  currentUser: null,
  loading: false,
  error: '',
};

const userReducer = (
  state: IDefaultState = defaultState,
  action: UserActionType,
): IDefaultState => {
  switch (action.type) {
    // Check user session
    case CHECK_USER_SESSION:
      return {
        ...state,
        currentUser: null,
        loading: true,
      };

    // Sign In
    case SIGN_IN_START:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: '',
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: action.payload,
      };

    // Sign Out
    case SIGN_OUT_START:
      return {
        ...state,
        loading: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loading: false,
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
