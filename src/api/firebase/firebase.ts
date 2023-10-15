import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDyWZ2RfmbZW4Z9P-cvtDtQ71xVIXBSEM4',
  authDomain: 'react-firebase-auth-a906f.firebaseapp.com',
  projectId: 'react-firebase-auth-a906f',
  storageBucket: 'react-firebase-auth-a906f.appspot.com',
  messagingSenderId: '543171603111',
  appId: '1:543171603111:web:f171a865e97d6022170982',
  measurementId: 'G-V6X212LYM3'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const createUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(getAuth(app), email, password);
};

export const signInUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(getAuth(app), email, password);
};

export const jwtToken = getAuth(app)
  .onAuthStateChanged((user) => {
    if (user !== null) {
      user.getIdToken().then((idToken) => { // <------ Check this line
        alert(idToken); // It shows the Firebase token now

        // REDUX

        return idToken;
      });
    }
  });
