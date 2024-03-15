import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAtZ9tpiycIo2QQCZlY98I24B2Pw83Wjus",
  authDomain: "utak-menu-pos.firebaseapp.com",
  databaseURL: "https://utak-menu-pos-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-menu-pos",
  storageBucket: "utak-menu-pos.appspot.com",
  messagingSenderId: "23793110423",
  appId: "1:23793110423:web:b6d20a5fd38745ada048d2",
  measurementId: "G-7631384GBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
