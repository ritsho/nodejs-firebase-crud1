import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAllUsers, deleteUser } from "./firestoreServiceCRUD.js";

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
const email = urlParams.get("email");
console.log(email);
const uid = urlParams.get("uid");
console.log(uid);

let allUsers = await getAllUsers();

let btnSignOut = document.getElementById("btnSignOut");
btnSignOut.onclick = function () {
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
};

function getTableData() {
  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableRow = document.createElement("tr");

  const header1 = document.createElement("th");
  header1.textContent = "First Name";
  tableRow.appendChild(header1);

  const header2 = document.createElement("th");
  header2.textContent = "Last Name";
  tableRow.appendChild(header2);

  const header3 = document.createElement("th");
  header3.textContent = "Email";
  tableRow.appendChild(header3);

  const header4 = document.createElement("th");
  header4.textContent = "Actions";
  tableRow.appendChild(header4);

  tableHead.appendChild(tableRow);
  table.appendChild(tableHead);

  const tableBody = document.createElement("tbody");

  console.log(allUsers);
  allUsers.forEach((doc) => {
    const data = doc.data();
    const tableBodyRow = document.createElement("tr");

    const fullName = data["Name"].split(" ");
    const firstName = fullName[0];
    const lastName = fullName[1];

    const dataFirstName = document.createElement("td");
    dataFirstName.textContent = firstName;
    tableBodyRow.appendChild(dataFirstName);

    const dataLastName = document.createElement("td");
    dataLastName.textContent = lastName;
    tableBodyRow.appendChild(dataLastName);

    const dataEmail = document.createElement("td");
    dataEmail.textContent = data["Email"];
    tableBodyRow.appendChild(dataEmail);

    const dataActions = document.createElement("td");
    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnDelete.onclick = async function () {
      await deleteUser(doc.id);

      // אחרי מחיקה, צריך לרענן את כל הטבלה שוב
      location.reload();
    };
    dataActions.appendChild(btnDelete);
    tableBodyRow.appendChild(dataActions);
    tableBody.appendChild(tableBodyRow);
  });

  table.appendChild(tableBody);
  document.getElementById("table-container").appendChild(table);
}

getTableData();
