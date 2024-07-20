import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



 console.log(process.env.API_KEY);
  console.log(process.env.AUTH_DOMAIN);
  console.log(import.meta.env.PROJECT_ID);
  console.log(import.meta.env.STORAGE_BUCKET);
  console.log(import.meta.env.MESSAGING_SENDER_ID);
  console.log(import.meta.env.APP_ID);
  console.log(import.meta.env.MEASUREMENT_ID);

const firebaseConfig = {
  apiKey: "AIzaSyBo_ODg2WV0Yh_0SzqAEx4k2mwN0BxsptI",
  authDomain: "raiystore.firebaseapp.com",
  databaseURL: "https://raiystore-default-rtdb.firebaseio.com",
  projectId: "raiystore",
  storageBucket: "raiystore.appspot.com",
  messagingSenderId: "618400888880",
  appId: "1:618400888880:web:6ba16b9c8340885cce15f5",
  measurementId: "G-RF4GG5699G"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth};
export const storage = getStorage(app);
