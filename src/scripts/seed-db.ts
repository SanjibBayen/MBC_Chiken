
// To run this script, run `npm run seed:db` in your terminal.
require('dotenv').config({ path: '.env.local' });
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { PRODUCTS_TO_SEED } from '../lib/products';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mbc-chicken-express";

const firebaseConfig = {
  projectId: projectId,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
};

// Check if all required environment variables are set
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error("Firebase Project ID or API key is not set. Please check your .env.local file.");
    process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  console.log(`Connecting to Firebase project: ${projectId}`);
  const productsCollection = collection(db, 'products');
  const batch = writeBatch(db);

  PRODUCTS_TO_SEED.forEach(product => {
    // Use the product's 'id' field as the document ID in Firestore
    const docRef = doc(productsCollection, product.id);
    // The product data should not include the 'id' field itself
    const { id, ...productData } = product; 
    batch.set(docRef, productData);
  });

  try {
    await batch.commit();
    console.log('Database seeded successfully with ' + PRODUCTS_TO_SEED.length + ' products!');
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error("\nPLEASE CHECK: Have you created a Firestore database in your Firebase project and set the security rules to allow writes?");
    console.error("You can do this by visiting the Firebase Console for your project, going to Firestore Database, and creating a database. For development, you can start with open rules and secure them later.");
  }
}

seedDatabase().then(() => {
    process.exit(0);
}).catch(err => {
    console.error("An unexpected error occurred during seeding:", err);
    process.exit(1);
});
