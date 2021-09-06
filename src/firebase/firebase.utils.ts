import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, collection, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAasPqppThdQYDPWTs6pJV_3ofceGg3B5c',
  authDomain: 'expense-tracker-bf11a.firebaseapp.com',
  projectId: 'expense-tracker-bf11a',
  storageBucket: 'expense-tracker-bf11a.appspot.com',
  messagingSenderId: '75162764789',
  appId: '1:75162764789:web:88851a95ff08ba4a2b0cbc',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      userAuth => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });

export const createUserProfileDocument = async (userAuth: User, additionalData?: any) => {
  if (!userAuth) {
    return;
  }
  // const userRef = doc(firestore, 'users', userAuth.uid);
  const usersCollectionRef = collection(firestore, 'users');
  const userRef = doc(usersCollectionRef, userAuth.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date().toISOString();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.error('Error creating user:', err);
    }
  }

  return userRef;
};

export { auth, firestore, doc, collection, getDoc, setDoc };
