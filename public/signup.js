import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

import { createUser, readUser, deleteUser } from "./firestoreServiceCRUD.js";

const firebaseConfig = {
  apiKey: "AIzaSyAkAcIHfchG17PHS7aRNaso-wkAHTyg1mY",
  authDomain: "crud1-3cbde.firebaseapp.com",
  projectId: "crud1-3cbde",
  storageBucket: "crud1-3cbde.appspot.com",
  messagingSenderId: "256014504961",
  appId: "1:256014504961:web:8be89a24443195fbf1dc00",
  measurementId: "G-0JPDNS976B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let btnCreate = document.getElementById("btnCreate");
btnCreate.onclick = function () {
  const username = document.querySelectorAll("input")[0].value;
  const password = document.querySelectorAll("input")[1].value;
  const email = document.querySelectorAll("input")[2].value;

  console.log("before createUserWithEmailAndPassword");

  createUserWithEmailAndPassword(auth, email, password)
    // הרישום הצליח
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const newUser = {
        Name: username,
        Email: email,
        Password: password,
      };
      console.log(
        "trying to create new document with the new user details...",
        newUser
      );
      createUser(user.uid, newUser);

      // נעבור לעמוד הכניסה שוב - כדי שהמשתמש יוכל להכנס עם הסיסמה שלו
      window.location.href = "index.html";
    })
    .catch((error) => {
      // המשתמש לא הצליח לבצע רישום - נציג את השגיאה
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + "\n" + errorMessage);
    });
};
