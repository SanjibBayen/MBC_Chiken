
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import type { Product } from '@/lib/types';

export class ProductService {
  private static productsCollection = collection(db, 'products');

  static async getProducts(): Promise<Product[]> {
    const snapshot = await getDocs(this.productsCollection);
    return snapshot.docs.map(doc => ({ ...doc.data() as Omit<Product, 'id'>, id: doc.id }));
  }

  static async getProductById(id: string): Promise<Product | null> {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data() as Omit<Product, 'id'>, id: docSnap.id };
    } else {
      return null;
    }
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const q = query(this.productsCollection, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { ...doc.data() as Omit<Product, 'id'>, id: doc.id };
    }
    
    return null;
  }

  static async createProduct(productData: Omit<Product, 'id'>): Promise<string> {
    const docRef = await addDoc(this.productsCollection, productData);
    return docRef.id;
  }

  static async updateProduct(id: string, productData: Partial<Omit<Product, 'id'>>): Promise<void> {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, productData);
  }

  static async deleteProduct(id: string): Promise<void> {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  }
}
