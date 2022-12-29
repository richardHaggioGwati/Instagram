/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { firebaseAuthentication } from '../lib/firebase';

export type USERPROFILETYPE = string | null | undefined;

export interface UserProfile {
  displayName: USERPROFILETYPE;
  photoURL: USERPROFILETYPE;
  email: USERPROFILETYPE;
  uid: string | undefined;
}

interface UserHelpers {
  user: UserProfile | undefined;
  createUser: (
    userEmail: string,
    userPassword: string,
    displayName: string,
    profilePicture: string,
  ) => Promise<any>;
  registerWithGoogle: () => void;
  logout: () => Promise<void>;
  signIn: (userEmail: string, userPassword: string) => Promise<any>;
}

interface Prop {
  children: React.ReactNode;
}

/**
 * !Use state values as context values
 */
export const UserContext = createContext<UserHelpers>({
  user: { displayName: '', photoURL: '', email: '/null.png', uid: '' },
  createUser: () => Promise.resolve(),
  registerWithGoogle: () => {},
  logout: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
});

export const UserContextProvider: React.FC<Prop> = ({ children }) => {
  /**
   * ! Provide type of user
   */
  const [newUser, setNewUser] = useState<UserProfile>();
  console.log('🚀 ~ file: instaContext.tsx:50 ~ newUser', newUser);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    login_hint: 'user@example.com',
  });

  useEffect(() => {
    onAuthStateChanged(firebaseAuthentication, (currentUser) => {
      const localeUser = {
        displayName: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
        email: currentUser?.email,
        uid: currentUser?.uid,
      };
      setNewUser(localeUser);
    });
  }, []);

  const logoutHandler = () => {
    Cookies.remove('Authorization');
    router.push('/login');
    return signOut(firebaseAuthentication);
  };

  const signInHandler = (userEmail: string, userPassword: string) => {
    return signInWithEmailAndPassword(
      firebaseAuthentication,
      userEmail,
      userPassword,
    );
  };

  const registerWithGoogleHandler = () => {
    signInWithPopup(firebaseAuthentication, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(
          '🚀 ~ file: instaContext.tsx:81 ~ .then ~ credential',
          credential,
        );
        const token = credential?.accessToken;
        console.log('🚀 ~ file: instaContext.tsx:83 ~ .then ~ token', token);
        // The signed-in user info.
        const { user } = result;
        router.push('/');
        setNewUser(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(
          '🚀 ~ file: instaContext.tsx:95 ~ signInWithGoogle ~ errorCode',
          errorCode,
        );
        const errorMessage = error.message;
        console.log(
          '🚀 ~ file: instaContext.tsx:97 ~ signInWithGoogle ~ errorMessage',
          errorMessage,
        );
        // The email of the user's account used.
        const { email } = error;
        console.log(
          '🚀 ~ file: instaContext.tsx:100 ~ signInWithGoogle ~ email',
          email,
        );
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          '🚀 ~ file: instaContext.tsx:103 ~ signInWithGoogle ~ credential',
          credential,
        );
        // ... set errors to provided object
      });
  };

  const createUserHandler = async (
    userEmail: string,
    userPassword: string,
    displayName: string,
    profilePicture: string,
  ) => {
    await createUserWithEmailAndPassword(
      firebaseAuthentication,
      userEmail,
      userPassword,
    );
    // @ts-ignore
    return updateProfile(firebaseAuthentication.currentUser, {
      displayName,
      photoURL: profilePicture,
    });
  };

  const contextValue: UserHelpers = {
    user: newUser,
    createUser: createUserHandler,
    logout: logoutHandler,
    signIn: signInHandler,
    registerWithGoogle: registerWithGoogleHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
