import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2eG_Y8kUPc68HxDoSPM4Tdn6UVMGrPms",
  authDomain: "utak-menu-pos-3ebd7.firebaseapp.com",
  databaseURL: "https://utak-menu-pos-3ebd7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-menu-pos-3ebd7",
  storageBucket: "utak-menu-pos-3ebd7.appspot.com",
  messagingSenderId: "163064075510",
  appId: "1:163064075510:web:3d5fe12fba0e8ed5a0c8d7",
  measurementId: "G-KKQ6Z5WRJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
