import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANCIrtYkO9c1L1eucSjTDLTXurtELbYI8",
  authDomain: "utak-menu-98129.firebaseapp.com",
  databaseURL: "https://utak-menu-98129-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-menu-98129",
  storageBucket: "utak-menu-98129.appspot.com",
  messagingSenderId: "428658497910",
  appId: "1:428658497910:web:249f54b49dd7c1372a8257",
  measurementId: "G-DTBC2Y4070"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
