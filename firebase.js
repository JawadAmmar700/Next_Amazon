import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2sTJ6_WfNkaKCb7uDZpUCGZbmKrhZKPI",
  authDomain: "next-327307.firebaseapp.com",
  projectId: "nextamazon-327307",
  storageBucket: "nextamazon-327307.appspot.com",
  messagingSenderId: "1057707444914",
  appId: "1:1057707444914:web:965416c831be6cee4cd7ab",
  measurementId: "G-10PPFPMF5Y",
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
export const db = app.firestore()
