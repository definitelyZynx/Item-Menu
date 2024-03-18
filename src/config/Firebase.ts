import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBM8soz7ZhGAFi_QMhBXln8IF9242ec3Os",
  authDomain: "utak-menu-item.firebaseapp.com",
  databaseURL: "https://utak-menu-item-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-menu-item",
  storageBucket: "utak-menu-item.appspot.com",
  messagingSenderId: "822736635927",
  appId: "1:822736635927:web:5a31bcd5e1da6b8de77452"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
