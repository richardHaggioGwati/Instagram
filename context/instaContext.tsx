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

export const UserContext = createContext<UserHelpers>({
  user: { displayName: '', photoURL: '', email: '/null.png', uid: '' },
  createUser: () => Promise.resolve(),
  registerWithGoogle: () => {},
  logout: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
});

export const UserContextProvider: React.FC<Prop> = ({ children }) => {
  const [newUser, setNewUser] = useState<UserProfile>();
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    login_hint: 'user@example.com',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuthentication,
      (currentUser) => {
        const localeUser = {
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
          email: currentUser?.email,
          uid: currentUser?.uid,
        };
        setNewUser(localeUser);
      },
    );

    return () => {
      unsubscribe();
    };
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
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;

        // The signed-in user info.
        const { user } = result;
        setNewUser(user);
        router.push('/');
      })
      .catch((error) => {
        // Handle Errors here.

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const errorMessage = error.message;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email } = error;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const credential = GoogleAuthProvider.credentialFromError(error);

        // ... return error object
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

  const contextValue = {
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
