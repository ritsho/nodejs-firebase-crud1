import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
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

// נשיג את הפרטים של המשתמש שנכנס
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
console.log(email);  
const uid = urlParams.get('uid');
console.log(uid);  

function deleteUser(user){
  console.log("TODO - Delete user");
}

function signout() {
  console.log("TODO - sign out");

  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      // היציאה הצליחה - אז נעבור לעמוד הכניסה
      window.location.href = "index.html";
    })
    .catch((error) => {
      // להציג את השגיאה בנסיון לצאת
      alert(error);
    });
}
