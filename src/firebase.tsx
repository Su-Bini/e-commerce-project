import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCV3nQZ2FUEbnLhyXZG_eCuj1moRzDvY08",
  authDomain: "e-commerce-project-5e9bf.firebaseapp.com",
  projectId: "e-commerce-project-5e9bf",
  storageBucket: "e-commerce-project-5e9bf.appspot.com",
  messagingSenderId: "437143435200",
  appId: "1:437143435200:web:91bd3f8e24ce87b24b3a25",
  measurementId: "G-DRK9T0KBJQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
