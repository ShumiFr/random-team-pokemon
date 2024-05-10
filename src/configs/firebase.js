import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
export const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // L'utilisateur est connecté.
    console.log("Utilisateur connecté: ", user);
  } else {
    // L'utilisateur est déconnecté.
    console.log("Utilisateur déconnecté");
  }
});
