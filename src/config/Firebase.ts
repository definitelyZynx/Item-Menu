import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8fut9iLpvKPlvTnmkzbrw_u36q5c2a-E",
  authDomain: "utak-menu-e3711.firebaseapp.com",
  databaseURL:
    "https://utak-menu-e3711-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-menu-e3711",
  storageBucket: "utak-menu-e3711.appspot.com",
  messagingSenderId: "829264209708",
  appId: "1:829264209708:web:cf391b3aa5af56edf7ae89",
  measurementId: "G-MXJQRQCQSM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
