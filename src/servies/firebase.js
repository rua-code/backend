// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  authDomain: "rent-app-ce090.firebaseapp.com",
  projectId: "rent-app-ce090",
  storageBucket: "rent-app-ce090.appspot.com",

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
