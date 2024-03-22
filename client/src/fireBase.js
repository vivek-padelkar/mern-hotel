// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-d3e22.firebaseapp.com',
  projectId: 'mern-estate-d3e22',
  storageBucket: 'mern-estate-d3e22.appspot.com',
  messagingSenderId: '264396651990',
  appId: '1:264396651990:web:4f8cc1ae567f9be4a1f877',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
