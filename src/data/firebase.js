// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdCunQSqBeaJ3cdrZ4F2gZabGDTWBMFYc",
  authDomain: "pokerogue-random.firebaseapp.com",
  projectId: "pokerogue-random",
  storageBucket: "pokerogue-random.appspot.com",
  messagingSenderId: "648643592132",
  appId: "1:648643592132:web:82cced5778d5951ac96e91",
  measurementId: "G-H42RMLVWNL",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // L'utilisateur est connecté.
    console.log("Utilisateur connecté: ", user);
    // Vous pouvez maintenant définir l'utilisateur dans l'état de votre application ou dans le stockage local pour le maintenir connecté.
  } else {
    // L'utilisateur est déconnecté.
    console.log("Utilisateur déconnecté");
    // Vous pouvez maintenant effacer l'utilisateur de l'état de votre application ou du stockage local.
  }
});
