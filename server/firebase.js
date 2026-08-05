
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxuO1dX6W9-3wWgcfmBJzYrnF1McorDxY",
  // ... rest of your config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Detect offline
window.addEventListener("offline", () => {
  console.warn("You are offline. Firebase auth will not work.");
});