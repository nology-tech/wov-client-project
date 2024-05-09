// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_TOKEN,
  authDomain: "wov-client-project-66242.firebaseapp.com",
  projectId: "wov-client-project-66242",
  storageBucket: "wov-client-project-66242.appspot.com",
  messagingSenderId: "1084549732009",
  appId: "1:1084549732009:web:d75fd1c6e622b7b1187bb8",
  measurementId: "G-L1F9662PYK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
