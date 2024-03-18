import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAykC4Vb-uxPQq7AcniLrHe-aefb-ZE2cw",
  authDomain: "utak-item-menu-f8e27.firebaseapp.com",
  databaseURL: "https://utak-item-menu-f8e27-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-item-menu-f8e27",
  storageBucket: "utak-item-menu-f8e27.appspot.com",
  messagingSenderId: "1043279128396",
  appId: "1:1043279128396:web:ae303e9e43f2c06a3211e9",
  measurementId: "G-PCLX2H8BG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
