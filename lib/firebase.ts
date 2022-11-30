import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCwknZsQ9qVmCayResVHk-icgD7iiivH90',
  authDomain: 'instagram-f07c5.firebaseapp.com',
  projectId: 'instagram-f07c5',
  storageBucket: 'instagram-f07c5.appspot.com',
  messagingSenderId: '111409447947',
  appId: '1:111409447947:web:63a373bb7da8d0a888b30e',
};

// Singleton patern to ensure only one instance of Firebase exists per session
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const firebaseDB = getFirestore();
const firebaseStorage = getStorage();

export { firebaseApp, firebaseDB, firebaseStorage };
