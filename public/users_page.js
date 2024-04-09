import { getAuth, signOut } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function deleteUser(user){
  console.log("TODO - Delete user");
}

function signout() {
  console.log("TODO - sign out");

  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      // היציאה הצליחה - אז נעבור לעמוד הכניסה
      window.location.href = "login.html";
    })
    .catch((error) => {
      // להציג את השגיאה בנסיון לצאת
      alert(error);
    });
}
