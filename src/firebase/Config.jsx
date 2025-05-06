import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJCGHUBlbBOR5ikddEx3Qxx1HUjTUEIno",
  authDomain: "cs-with-sanjay.firebaseapp.com",
  projectId: "cs-with-sanjay",
  storageBucket: "cs-with-sanjay.firebasestorage.app",
  messagingSenderId: "749218574464",
  appId: "1:749218574464:web:978d2f75071daf6643f665",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
