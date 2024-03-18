import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqgPH53gJ3ZQzd8pAt2O7PLRQTIRuVsp4",
  authDomain: "utak-menu-item-7e313.firebaseapp.com",
  databaseURL: "https://utak-menu-item-7e313-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-menu-item-7e313",
  storageBucket: "utak-menu-item-7e313.appspot.com",
  messagingSenderId: "553470291999",
  appId: "1:553470291999:web:6137736b2b1b5d7cb9652a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
