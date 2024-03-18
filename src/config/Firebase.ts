import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDAOm6QOxIdEgSCIbn0T-lWIHCh-UZw0fo",
  authDomain: "utak-item-menu.firebaseapp.com",
  databaseURL: "https://utak-item-menu-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-item-menu",
  storageBucket: "utak-item-menu.appspot.com",
  messagingSenderId: "730271258419",
  appId: "1:730271258419:web:9db65b814e8a5236b11046",
  measurementId: "G-VLQBGFHDEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
