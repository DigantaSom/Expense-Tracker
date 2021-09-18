import { Dispatch } from 'redux';

import {
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import {
  auth,
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
  ISignInSuccess,
  ISignInFailure,
  SignUpDispatchType,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SignOutDispatchType,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from './user.types';
import { CLEAR_REPORT } from '../report/report.types';

const getSnapshotFromUserAuth =
  (userAuth: User, additionalData?: any) =>
  async (dispatch: Dispatch<ISignInSuccess | ISignInFailure>) => {
    try {
      const userRef = await createUserProfileDocument(userAuth, additionalData);
      if (!userRef) {
        return;
      }
      const userSnapshot = await getDoc(userRef);
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: {
          id: userSnapshot.id,
          ...userSnapshot.data(),
        } as IUser,
      });
    } catch (err: any) {
      dispatch({
        type: SIGN_IN_FAILURE,
        payload: err.message,
      });
      alert(err.message);
    }
  };

export const checkUserSession =
  () => async (dispatch: Dispatch<CheckUserSessionDispatchType>) => {
    dispatch({
      type: CHECK_USER_SESSION,
    });

    try {
      const userAuth = await getCurrentUser();
      if (!userAuth) {
        dispatch({
          type: SIGN_IN_FAILURE,
          payload: 'No user',
        });
        return;
      }
      dispatch(getSnapshotFromUserAuth(userAuth as User) as any);
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
    dispatch(getSnapshotFromUserAuth(user) as any);
  } catch (err: any) {
    dispatch({
      type: SIGN_IN_FAILURE,
      payload: err.message,
    });
    alert(err.message);
  }
};

export const emailSignIn =
  (email: string, password: string) => async (dispatch: Dispatch<SignInDispatchType>) => {
    dispatch({
      type: SIGN_IN_START,
    });

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(getSnapshotFromUserAuth(user) as any);
    } catch (err: any) {
      dispatch({
        type: SIGN_IN_FAILURE,
        payload: err.message,
      });
      alert(err.message);
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
      dispatch(getSnapshotFromUserAuth(user, { displayName, photoURL: '' }) as any);
    } catch (err: any) {
      dispatch({
        type: SIGN_UP_FAILURE,
        payload: err.message,
      });
      alert(err.message);
    }
  };

export const signOutAction = () => async (dispatch: Dispatch<SignOutDispatchType>) => {
  dispatch({
    type: SIGN_OUT_START,
  });

  if (!window.confirm('Logout Confirmation')) {
    dispatch({
      type: SIGN_OUT_FAILURE,
      payload: 'Sign-out denied.',
    });
    return;
  }

  try {
    await signOut(auth);

    dispatch({
      type: SIGN_OUT_SUCCESS,
    });

    dispatch({
      type: CLEAR_REPORT,
    });
  } catch (err: any) {
    dispatch({
      type: SIGN_OUT_FAILURE,
      payload: err.message,
    });
    alert(err.message);
  }
};
