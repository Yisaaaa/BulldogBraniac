import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5IwhLC7uxc34LXLEWbFW00MItcUUgc8w",
  authDomain: "bulldogbraniac.firebaseapp.com",
  projectId: "bulldogbraniac",
  storageBucket: "bulldogbraniac.appspot.com",
  messagingSenderId: "81071085631",
  appId: "1:81071085631:web:b820710a2d26df215a808a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");
