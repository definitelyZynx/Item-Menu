/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/config/Firebase";
import { ref, remove, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

// Insert Into the Database
export const write_db = (refPath: string, data: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uuid = uuidv4();
    set(ref(db, `/${refPath}/${uuid}`), {
      ...data,
      uuid: uuid
    }).then(() => {
      resolve(uuid);
    }).catch((error) => {
      reject(error);
    });
  });
};

// Update the Database
export const update_db = (refPath: string, itemId: string, data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    set(ref(db, `/${refPath}/${itemId}`), data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};


// Delete From the Database
export const delete_db = (refPath: string, uuid: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    remove(ref(db, `${refPath}/${uuid}`))
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};