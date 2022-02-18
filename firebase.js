import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiXyk9q_1nhC5uyCC3zOV-tnkOQPw6BCU",
  authDomain: "next-8cd71.firebaseapp.com",
  projectId: "next-8cd71",
  storageBucket: "next-8cd71.appspot.com",
  messagingSenderId: "387044199286",
  appId: "1:387044199286:web:bfaccfa0bf78943b55c857",
  measurementId: "G-QNS5WHTLKQ",
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
export const db = app.firestore()
