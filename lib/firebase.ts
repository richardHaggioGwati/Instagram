import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { FieldValue } from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCwknZsQ9qVmCayResVHk-icgD7iiivH90',
  authDomain: 'instagram-f07c5.firebaseapp.com',
  projectId: 'instagram-f07c5',
  storageBucket: 'instagram-f07c5.appspot.com',
  messagingSenderId: '111409447947',
  appId: '1:111409447947:web:63a373bb7da8d0a888b30e',
};

const firebase = initializeApp(config);

export { firebase, FieldValue };
