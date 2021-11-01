// Firebase Integration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVc6_sT83QWcX-TCxDEDtVMHsMRaTy2yY",
  authDomain: "uniroom-fdcd7.firebaseapp.com",
  databaseURL: "https://uniroom-fdcd7-default-rtdb.firebaseio.com",
  projectId: "uniroom-fdcd7",
  storageBucket: "uniroom-fdcd7.appspot.com",
  messagingSenderId: "644435940478",
  appId: "1:644435940478:web:40e3f7aea01972606bb42f",
  measurementId: "G-KQK1K10WTL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);