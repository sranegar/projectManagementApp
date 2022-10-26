//Everything related to connecting ot firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDFYLMtXptazc_CZ3bAeEGV_6KIYc-C1_k",
  authDomain: "project-management-be1ab.firebaseapp.com",
  projectId: "project-management-be1ab",
  storageBucket: "project-management-be1ab.appspot.com",
  messagingSenderId: "1089020406342",
  appId: "1:1089020406342:web:0094f9d7534d1b5694f847",
  measurementId: "G-29ZDZ9BKN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
