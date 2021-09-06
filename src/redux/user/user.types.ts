export const CHECK_USER_SESSION = 'CHECK_USER_SESSION';

export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_OUT_START = 'SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

export interface IUser {
  currentUser: {
    displayName: string;
    email: string;
    photoURL: string;
    createdAt: string;
  };
}

// Check user session
interface ICheckUserSession {
  type: typeof CHECK_USER_SESSION;
}
export type CheckUserSessionDispatchType =
  | ICheckUserSession
  | ISignInSuccess
  | ISignInFailure;

// Sign In
interface ISignInStart {
  type: typeof SIGN_IN_START;
}
export interface ISignInSuccess {
  type: typeof SIGN_IN_SUCCESS;
  payload: IUser;
}
export interface ISignInFailure {
  type: typeof SIGN_IN_FAILURE;
  payload: string;
}
export type SignInDispatchType = ISignInStart | ISignInSuccess | ISignInFailure;

// Sign Up
interface ISignUpStart {
  type: typeof SIGN_UP_START;
}
interface ISignUpSuccess {
  type: typeof SIGN_UP_SUCCESS;
}
interface ISignUpFailure {
  type: typeof SIGN_UP_FAILURE;
  payload: string;
}
export type SignUpDispatchType = ISignUpStart | ISignUpSuccess | ISignUpFailure;

// Sign Out
interface ISignOutStart {
  type: typeof SIGN_OUT_START;
}
interface ISignOutSuccess {
  type: typeof SIGN_OUT_SUCCESS;
}
interface ISignOutFailure {
  type: typeof SIGN_OUT_FAILURE;
  payload: string;
}
export type SignOutDispatchType = ISignOutStart | ISignOutSuccess | ISignOutFailure;

// User Action type
export type UserActionType =
  | CheckUserSessionDispatchType
  | SignInDispatchType
  | SignOutDispatchType;
