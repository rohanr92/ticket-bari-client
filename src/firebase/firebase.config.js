import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBpl45LYE0TklR2T64dRdxNHwxa1END8fQ",
  authDomain: "ticketbari---c.firebaseapp.com",
  projectId: "ticketbari---c",
  storageBucket: "ticketbari---c.firebasestorage.app",
  messagingSenderId: "614964643592",
  appId: "1:614964643592:web:6dc038d8fdab5a57138ebd"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;