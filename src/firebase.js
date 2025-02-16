import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJUzDouYOB5jh09ZfDfuvo3MRy9iiFZyc",
  authDomain: "markettingapp-c4808.firebaseapp.com",
  projectId: "markettingapp-c4808",
  storageBucket: "markettingapp-c4808.firebasestorage.app",
  messagingSenderId: "496350403101",
  appId: "1:496350403101:web:5b4571cf1bc3cd2ee904f4",
  measurementId: "G-84R919NQ03",
  databaseURL: "https://markettingapp-c4808.firebaseio.com",
  authPersistence: "local"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export default app;
