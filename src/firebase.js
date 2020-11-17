import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBO5UMjuMCcRcUKY_CyC0d0BjoTreJgRyE",
  authDomain: "chatter-13abf.firebaseapp.com",
  databaseURL: "https://chatter-13abf.firebaseio.com",
  projectId: "chatter-13abf",
  storageBucket: "chatter-13abf.appspot.com",
  messagingSenderId: "12927741412",
  appId: "1:12927741412:web:0b5a74a337bd1621746bf1",
  measurementId: "G-3D60RMXN9Q",
});

const db = firebaseApp.firestore();

export default db;
