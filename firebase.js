import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBSEEdz64JnvqODZtWVbEYOvOy-n6L-IVw",
  authDomain: "next-c5f69.firebaseapp.com",
  projectId: "next-c5f69",
  storageBucket: "next-c5f69.appspot.com",
  messagingSenderId: "336388356994",
  appId: "1:336388356994:web:226c672623a4745ac1ad9b",
  measurementId: "G-0RC5RPMXL0",
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
export const db = app.firestore()
