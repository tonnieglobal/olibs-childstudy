import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaFEol7JsxS3NMkxgtaKHSv3DcDxMA3as",
  authDomain: "olibs-child-study.firebaseapp.com",
  databaseURL: "https://olibs-child-study-default-rtdb.firebaseio.com",
  projectId: "olibs-child-study",
  storageBucket: "olibs-child-study.firebasestorage.app",
  messagingSenderId: "641580595925",
  appId: "1:641580595925:web:971a99fd44b1622ec4c05c",
  measurementId: "G-GDVXH1VV0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
