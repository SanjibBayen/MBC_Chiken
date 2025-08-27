// To run this script, run `npm run seed:db` in your terminal.
require('dotenv').config({ path: '.env.local' });
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch } from 'firebase/firestore';
import { PRODUCTS } from '../lib/products';

const firebaseConfig = {
  projectId: "mbc-chicken-express",
  appId: "1:467979805218:web:e03c809a9537082c6a207b",
  storageBucket: "mbc-chicken-express.firebasestorage.app",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBQwKZHnPA-M8jmgci50rpGeXyJ5G71i70",
  authDomain: "mbc-chicken-express.firebaseapp.com",
  messagingSenderId: "467979805218"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  const productsCollection = collection(db, 'products');
  const batch = writeBatch(db);

  PRODUCTS.forEach(product => {
    const { id, ...productData } = product;
    const docRef = doc(productsCollection, id);
    batch.set(docRef, productData);
  });

  try {
    await batch.commit();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase().then(() => {
    process.exit(0);
});
