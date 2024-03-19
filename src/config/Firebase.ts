import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAu56sLPHLmbS5fxEzuFZp2QAHF8wX0kBo",
  authDomain: "utak-menu-item-db.firebaseapp.com",
  databaseURL: "https://utak-menu-item-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-menu-item-db",
  storageBucket: "utak-menu-item-db.appspot.com",
  messagingSenderId: "929220129294",
  appId: "1:929220129294:web:a549431a15fd633ea3025f",
  measurementId: "G-P87PHJ8NHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
