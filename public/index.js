import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"; 
 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
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
  measurementId: "G-0JPDNS976B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function login() {
  // נשיג את שם המשתמש והסיסמה שהוא כתב
  const username = document.getElementById("txtUsername").value;
  const password = document.getElementById("txtPassword").value;

  if (username == "" || password == "") {
    alert("user name or password empty");
    return;
  }

  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // צד השרת דיווח שהמשתמש כתב סיסמה נכונה אז נקבל את פרטי המשתמש שכתובים בפיירבייס
      const user = userCredential.user;
      console.log(user);
      // נעבור לעמוד המשתמשים
      window.location.href = "users_page.html";
    })
    .catch((error) => {
      // המשתמש לא הצליח לבצע כניסה - נציג את השגיאה
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + "\n" + errorMessage);
    });
}
