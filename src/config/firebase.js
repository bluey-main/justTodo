// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "crudflutterapp-6732e.firebaseapp.com",
  projectId: "crudflutterapp-6732e",
  storageBucket: "crudflutterapp-6732e.appspot.com",
  messagingSenderId: "131182779768",
  appId: "1:131182779768:web:1243699d67f67b1c847c8d"
};
// project-662731705261
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()