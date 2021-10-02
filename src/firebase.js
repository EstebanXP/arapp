import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
//Esta es la  buena 

const firebaseConfig = {
  apiKey: "AIzaSyBLbUC8BT6f-ZJF3WLTwN6WbJajcca28LE",
  authDomain: "abbey-road-app.firebaseapp.com",
  projectId: "abbey-road-app",
  storageBucket: "abbey-road-app.appspot.com",
  messagingSenderId: "126323543490",
  appId: "1:126323543490:web:23c0f99d65cfb044c51a5b"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
//https://firebase.google.com/docs/firestore/quickstart#web-version-9
