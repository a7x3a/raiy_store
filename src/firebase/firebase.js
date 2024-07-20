import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const {API_KEY,APP_ID,AUTH_DOMAIN,MEASUREMENT_ID,MESSAGING_SENDERID,PROJECT_ID,STORAGE_BUCKET} = import.meta.env;
const firebaseConfig = {
  apiKey: "AIzaSyBo_ODg2WV0Yh_0SzqAEx4k2mwN0BxsptI",
  authDomain: "raiystore.firebaseapp.com",
  projectId: "raiystore",
  storageBucket: "raiystore.appspot.com",
  messagingSenderId: "618400888880",
  appId: "1:618400888880:web:6ba16b9c8340885cce15f5",
  measurementId: "G-RF4GG5699G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth};
export const storage = getStorage(app);
