/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/config/Firebase";
import { ref, remove, set, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { auth } from "@/config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Insert Into the Database
export const write_db = (refPath: string, data: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if user is authenticated
    if (auth.currentUser) {
      const uuid = uuidv4();
      set(ref(db, `db/${refPath}/${uuid}`), {
        ...data,
        uuid: uuid
      }).then(() => {
        resolve(uuid);
      }).catch((error) => {
        reject(error);
      });
    } else {
      reject(new Error("User not authenticated"));
    }
  });
};

// Update the Database
export const update_db = (refPath: string, itemId: string, data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if user is authenticated
    if (auth.currentUser) {
      const itemRef = ref(db, `db/${refPath}/${itemId}`);
      update(itemRef, data)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error("User not authenticated")); 
    }
  });
};

// Delete From the Database
export const delete_db = (refPath: string, uuid: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if user is authenticated
    if (auth.currentUser) {
      remove(ref(db, `db/${refPath}/${uuid}`))
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error("User not authenticated")); 
    }
  });
};

// Sign In
export const signInWithEmailPassword = (email: string, password: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
