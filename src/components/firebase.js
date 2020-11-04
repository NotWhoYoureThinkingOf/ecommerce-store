import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDnDDlpoV6dKBwlZY4qzvYOdQBgQUbHCSs",
  authDomain: "ecommerce-store-25bd7.firebaseapp.com",
  databaseURL: "https://ecommerce-store-25bd7.firebaseio.com",
  projectId: "ecommerce-store-25bd7",
  storageBucket: "ecommerce-store-25bd7.appspot.com",
  messagingSenderId: "769185014496",
  appId: "1:769185014496:web:c027396a2b9f5ae3a06685",
  measurementId: "G-P78EVVD0YL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };