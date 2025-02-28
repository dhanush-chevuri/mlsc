import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBuiVTulfbpjEwP-pg8GhJhdkFGSDqnOfk",
  authDomain: "hackxcelerate2k25.firebaseapp.com",
  projectId: "hackxcelerate2k25",
  storageBucket: "hackxcelerate2k25.firebasestorage.app",
  messagingSenderId: "863579080766",
  appId: "1:863579080766:web:869c4f91053ef3aa0da96f",
  measurementId: "G-M0GBETDC4H"
};

// Initialize Firebase app (only if it hasn't been initialized yet)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);  // Use the initialized app for auth
const googleProvider = new GoogleAuthProvider();

const database = getDatabase(app);  // Use the initialized app for database

export {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  database,
};