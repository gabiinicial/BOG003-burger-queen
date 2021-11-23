// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIQYqpHx5YXNQtPyAmJN13OsjFY39pYvU",
  authDomain: "burger-aquelarre.firebaseapp.com",
  databaseURL: "https://burger-aquelarre-default-rtdb.firebaseio.com",
  projectId: "burger-aquelarre",
  storageBucket: "burger-aquelarre.appspot.com",
  messagingSenderId: "295164702885",
  appId: "1:295164702885:web:2df907eb52d5aa2af95d4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
export const db = getFirestore(app);
