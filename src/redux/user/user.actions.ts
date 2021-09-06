import { Dispatch } from 'redux';

import {
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  auth,
  getDoc,
  getCurrentUser,
  googleProvider,
  createUserProfileDocument,
} from '../../firebase/firebase.utils';

import {
  IUser,
  CheckUserSessionDispatchType,
  CHECK_USER_SESSION,
  SignInDispatchType,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SignUpDispatchType,
  SignOutDispatchType,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_UP_START,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  ISignInSuccess,
} from './user.types';

export const checkUserSession =
  () => async (dispatch: Dispatch<CheckUserSessionDispatchType>) => {
    dispatch({
      type: CHECK_USER_SESSION,
    });

    try {
      const userAuth = await getCurrentUser();
      if (!userAuth) {
        return;
      }
      const userRef = await createUserProfileDocument(userAuth as User);
      if (!userRef) {
        return;
      }
      const userSnapshot = await getDoc(userRef);
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: userSnapshot.data() as IUser,
      });
    } catch (err: any) {
      dispatch({
        type: SIGN_IN_FAILURE,
        payload: err.message,
      });
    }
  };

export const googleSignIn = () => async (dispatch: Dispatch<SignInDispatchType>) => {
  dispatch({
    type: SIGN_IN_START,
  });

  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    const userRef = await createUserProfileDocument(user);
    if (!userRef) {
      return;
    }
    const userSnapshot = await getDoc(userRef);
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: userSnapshot.data() as IUser,
    });
  } catch (err: any) {
    dispatch({
      type: SIGN_IN_FAILURE,
      payload: err.message,
    });
  }
};

export const emailSignIn =
  (email: string, password: string) => async (dispatch: Dispatch<SignInDispatchType>) => {
    dispatch({
      type: SIGN_IN_START,
    });

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userRef = await createUserProfileDocument(user);
      if (!userRef) {
        return;
      }
      const userSnapshot = await getDoc(userRef);
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: userSnapshot.data() as IUser,
      });
    } catch (err: any) {
      dispatch({
        type: SIGN_IN_FAILURE,
        payload: err.message,
      });
    }
  };

export const signUp =
  (email: string, password: string, displayName: string) =>
  async (dispatch: Dispatch<SignUpDispatchType | ISignInSuccess>) => {
    dispatch({
      type: SIGN_UP_START,
    });

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({
        type: SIGN_UP_SUCCESS,
      });

      // Sign in after sign up
      const userRef = await createUserProfileDocument(user, {
        displayName,
        photoURL: '',
      });
      if (!userRef) {
        return;
      }
      const userSnapshot = await getDoc(userRef);
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: userSnapshot.data() as IUser,
      });
    } catch (err: any) {
      dispatch({
        type: SIGN_UP_FAILURE,
        payload: err.message,
      });
    }
  };

export const signOutAction = () => async (dispatch: Dispatch<SignOutDispatchType>) => {
  dispatch({
    type: SIGN_OUT_START,
  });

  try {
    await signOut(auth);
    dispatch({
      type: SIGN_OUT_SUCCESS,
    });
  } catch (err: any) {
    dispatch({
      type: SIGN_OUT_FAILURE,
      payload: err.message,
    });
  }
};
