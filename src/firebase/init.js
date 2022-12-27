// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN4ClqRE4gYtaqifekZ8VGS8UWzXdqjMI",
  authDomain: "fire-base-practise-cc4c4.firebaseapp.com",
  projectId: "fire-base-practise-cc4c4",
  storageBucket: "fire-base-practise-cc4c4.appspot.com",
  messagingSenderId: "78377618155",
  appId: "1:78377618155:web:460422c7d5e2a87d4e4cae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();