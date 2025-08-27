import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "mbc-chicken-express",
  appId: "1:467979805218:web:e03c809a9537082c6a207b",
  storageBucket: "mbc-chicken-express.firebasestorage.app",
  apiKey: "AIzaSyBQwKZHnPA-M8jmgci50rpGeXyJ5G71i70",
  authDomain: "mbc-chicken-express.firebaseapp.com",
  messagingSenderId: "467979805218"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
