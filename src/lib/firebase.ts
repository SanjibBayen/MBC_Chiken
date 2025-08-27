import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "mbc-chicken-express",
  appId: "1:467979805218:web:e03c809a9537082c6a207b",
  storageBucket: "mbc-chicken-express.firebasestorage.app",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mbc-chicken-express.firebaseapp.com",
  messagingSenderId: "467979805218"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
