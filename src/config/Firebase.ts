import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpaiI9QPGhtknJ2dYYpLlR0YPcE2PYM6c",
  authDomain: "db-utak-item.firebaseapp.com",
  databaseURL: "https://db-utak-item-default-rtdb.firebaseio.com",
  projectId: "db-utak-item",
  storageBucket: "db-utak-item.appspot.com",
  messagingSenderId: "704464476683",
  appId: "1:704464476683:web:4f6001259d74950b69850e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getDatabase(app);
export { auth };
