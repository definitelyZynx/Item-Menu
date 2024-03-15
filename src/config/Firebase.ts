import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBre_wCBEm4Jc3sr_PYmXFEx7VqDoF6eJo",
  authDomain: "menu-utak.firebaseapp.com",
  projectId: "menu-utak",
  storageBucket: "menu-utak.appspot.com",
  messagingSenderId: "309104874478",
  appId: "1:309104874478:web:61de3bab331765a07fb4ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
