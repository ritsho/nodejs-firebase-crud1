import {
  getAuth,
  signInWithEmailAndPassword,
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

const app = initializeApp(firebaseConfig);

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
let btnLogin = document.getElementById("btnLogin");
btnLogin.onclick = tryLogin;
txtPassword.onkeyup = function(event){
  // אם לחצו על אנטר כשנמצאים בשדה סיסמה
  if (event.keyCode === 13){
    tryLogin();
  }
}
txtEmail.onkeyup = function(event){
  // אם לחצו על אנטר כשנמצאים בשדה שם-משתמש
  if (event.keyCode === 13 == 10){
    tryLogin();
  }
};

function tryLogin() {
  // נשיג את שם המשתמש והסיסמה שהוא כתב
  const email = txtEmail.value;
  const password = txtPassword.value;

  if (email == "" || password == "") {
    alert("user name or password empty");
    return;
  }

  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("sign in succeess");
      // צד השרת דיווח שהמשתמש כתב סיסמה נכונה אז נקבל את פרטי המשתמש שכתובים בפיירבייס
      const user = userCredential.user;
      console.log(user);
      // נעבור לעמוד המשתמשים
      window.location.replace(`users_page.html?email=${email}&uid=${user.uid}`);
    })
    .catch((error) => {
      console.log("sign in failed");
      // המשתמש לא הצליח לבצע כניסה - נציג את השגיאה
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + "\n" + errorMessage);
    });
};
