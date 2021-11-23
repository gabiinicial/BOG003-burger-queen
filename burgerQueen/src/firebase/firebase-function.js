
console.log("hola");// import { initializeApp } from 'firebase/app';
import {  collection } from 'firebase/firestore/lite';
import { db } from './firebase-conection';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Get a list of cities from your database
import { collection, addDoc } from "firebase/firestore";

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e); 
}