// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
