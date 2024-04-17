import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkAcIHfchG17PHS7aRNaso-wkAHTyg1mY",
  authDomain: "crud1-3cbde.firebaseapp.com",
  projectId: "crud1-3cbde",
  storageBucket: "crud1-3cbde.appspot.com",
  messagingSenderId: "256014504961",
  appId: "1:256014504961:web:8be89a24443195fbf1dc00",
  measurementId: "G-0JPDNS976B",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const USERS_COLLECTION = "users";

class User {
  constructor(id, name, email, password) {
    this.Id = id;
    this.Name = name;
    this.Email = email;
    this.Password = password;
  }
  toString() {
    return (
      this.Id + ", " + this.Name + ", " + this.Email + ", " + this.Password
    );
  }
}

// Firestore data converter
const userConverter = {
  toFirestore: (user) => {
    return {
      Name: user.Name,
      Email: user.Email,
      Password: user.Password,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.Name, data.Email, data.Password);
  },
};

// פונקציה ליצור משתמש חדש
export async function createUser(uid, user) {
  try {
    if (uid =="" || user == null){
      console.log("incorrect data to save. exiting...");
      return;
    } 
    const users = collection(db, "users");
    console.log('about to save user to firestore:', user);
    await setDoc(doc(users, uid), user);
    console.log("saved user!!!.", uid);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// פונקציה לקריאת הפרטים של המשתמש לפי המזהה
export async function readUser(userId) {
  try {
    const docSnapshot = await db.collection(USERS_COLLECTION).doc(userId).get();
    if (docSnapshot.exists) {
      return docSnapshot.data();
    } else {
      console.log("user not found!!!");
      return null;
    }
  } catch (error) {
    console.error("Error reading user:", error);
    throw error;
  }
}

// למחוק משתמש
export async function deleteUser(userId) {
  try {
    await db.collection(USERS_COLLECTION).doc(userId).delete();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
