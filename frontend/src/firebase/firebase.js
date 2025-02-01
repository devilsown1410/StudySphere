// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDimNAmdXOXlJqC_EqLN10TI_z_ya1v34E",
  authDomain: "studysphere-c95c8.firebaseapp.com",
  projectId: "studysphere-c95c8",
  storageBucket: "studysphere-c95c8.firebasestorage.app",
  messagingSenderId: "680935799142",
  appId: "1:680935799142:web:cdf427bcd9b55be30570a7",
  measurementId: "G-Y4J4YCB8X3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export { app,auth }