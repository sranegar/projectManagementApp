//Everything related to connecting ot firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAU4t_J72IunwaRG6Kk1P5wbBPOxyA_G14",
  authDomain: "n423-slr.firebaseapp.com",
  projectId: "n423-slr",
  storageBucket: "n423-slr.appspot.com",
  messagingSenderId: "215005452503",
  appId: "1:215005452503:web:23590f8741cbfffa187892",
  measurementId: "G-FXRJV61VR7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
