// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
///import firebase from "firebase/compat/app"
//import "firebase/compat/firestore"
import firebase from "firebase";
require("@firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvqWl2kjTbBOKO1G4Ns-YaClHe-ZpQzJI",
  authDomain: "ciclista-eletronico-5a5e4.firebaseapp.com",
  projectId: "ciclista-eletronico-5a5e4",
  storageBucket: "ciclista-eletronico-5a5e4.appspot.com",
  messagingSenderId: "592540441628",
  appId: "1:592540441628:web:06f54ae1609da342ed13d9"
};
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 export default firebase.firestore()