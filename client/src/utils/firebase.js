import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-358f3.firebaseapp.com",
  projectId: "interviewiq-358f3",
  storageBucket: "interviewiq-358f3.firebasestorage.app",
  messagingSenderId: "924388079614",
  appId: "1:924388079614:web:5c737a9784e783f7ab72af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };