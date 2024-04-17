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
  authDomain: "wov-client-project.firebaseapp.com",
  projectId: "wov-client-project",
  storageBucket: "wov-client-project.appspot.com",
  messagingSenderId: "500736757552",
  appId: "1:500736757552:web:2a7142e64715df07aec2f5",
  measurementId: "G-CJVJ3K385S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
