import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhFHfR0y7uW1w04XYelryq5OlOYJl7eYM",
  authDomain: "kakaostory-b8662.firebaseapp.com",
  projectId: "kakaostory-b8662",
  storageBucket: "kakaostory-b8662.appspot.com",
  messagingSenderId: "752702432709",
  appId: "1:752702432709:web:58f0835f85eff7c63957ac",
};

const app = initializeApp(firebaseConfig);

export const userAuth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
