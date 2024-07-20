import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const API_KEY = import.meta.env.API_KEY;
const APP_ID = import.meta.env.APP_ID;
const AUTH_DOMAIN = import.meta.env.AUTH_DOMAIN;
const MEASUREMENT_ID = import.meta.env.MEASUREMENT_ID;
const MESSAGING_SENDERID = import.meta.env.MESSAGING_SENDERID;
const PROJECT_ID = import.meta.env.PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.STORAGE_BUCKET;

console.log(API_KEY);
console.log(APP_ID);
console.log(AUTH_DOMAIN);
console.log(MEASUREMENT_ID);
console.log(MESSAGING_SENDERID);
console.log(PROJECT_ID);
console.log(STORAGE_BUCKET);
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDERID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth};
export const storage = getStorage(app);
