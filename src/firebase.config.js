import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBx85iL0fQlYbbrbCrji8cjN6wwDTrqIzc",
  authDomain: "floria-app.firebaseapp.com",
  projectId: "floria-app",
  storageBucket: "floria-app.appspot.com",
  messagingSenderId: "526791744511",
  appId: "1:526791744511:web:00d61aa4ff3619a8e1a5ca",
  measurementId: "G-PJXPH7T2BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;