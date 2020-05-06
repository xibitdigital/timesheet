import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const {
  REACT_APP_API_KEY: apiKey,
  REACT_APP_AUTH_DOMAIN: authDomain,
  REACT_APP_DATABASE_URL: databaseURL,
  REACT_APP_PROJECT_ID: projectId,
  REACT_APP_STORAGE_BUCKET: storageBucket,
  REACT_APP_MESSAGE_SENDER_ID: messagingSenderId,
  REACT_APP_APP_ID: appId,
} = process.env

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

export const FIREBASE = firebase.initializeApp(firebaseConfig)
export const FIRESTORE = FIREBASE.firestore()

// https://firebase.google.com/docs/auth/web/google-signin
export const DEFAULT_PROVIDER = new firebase.auth.GoogleAuthProvider()

export enum COLLECTIONS {
  ITEMS = 'items',
  CLIENT = 'clients',
  PROJECT = 'project',
  TIMESHEET = 'timesheet',
}
