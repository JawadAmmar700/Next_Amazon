import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBIsWcXk8imAJFM0P55F5CRGlytJpSmueI',
  authDomain: 'nextportfolio-b7556.firebaseapp.com',
  projectId: 'nextportfolio-b7556',
  storageBucket: 'nextportfolio-b7556.appspot.com',
  messagingSenderId: '223127938382',
  appId: '1:223127938382:web:3dfcec5ba653b9d6772a1f',
  measurementId: 'G-ZFVFLVE5B2',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
export const db = app.firestore()
