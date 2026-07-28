// src/firebase/Firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY1rvm8dRNBF6z0LjBKk_Ctb30uEbNXkY",
  authDomain: "ngo-web-834ac.firebaseapp.com",
  projectId: "ngo-web-834ac",
  storageBucket: "ngo-web-834ac.firebasestorage.app",
  messagingSenderId: "986411540514",
  appId: "1:986411540514:web:ea08b1912a64d114f96a7b",
  measurementId: "G-SF3QEG7M8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth, Firestore and Storage instances used across Login, Admin and Activities
export const auth = getAuth(app);
export const db = getFirestore(app);
//changes

export const storage = getStorage(app);

export default app;