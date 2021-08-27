import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpko3SgNU6lObY4PU65vm4XZEsda9SFNc",
  authDomain: "next-cc6c2.firebaseapp.com",
  projectId: "next-cc6c2",
  storageBucket: "next-cc6c2.appspot.com",
  messagingSenderId: "227542697450",
  appId: "1:227542697450:web:676355c53b09be4f559e93",
  measurementId: "G-TSGQMF06Y1",
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
export const db = app.firestore()
