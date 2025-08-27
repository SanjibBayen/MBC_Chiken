
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where, addDoc, serverTimestamp, orderBy, updateDoc } from 'firebase/firestore';
import type { Order } from '@/lib/types';

export class OrderService {
  private static ordersCollection = collection(db, 'orders');

  static async getOrders(): Promise<Order[]> {
    const q = query(this.ordersCollection, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data() as Omit<Order, 'id'>, id: doc.id }));
  }
  
  static async getOrdersByUserId(userId: string): Promise<Order[]> {
    const q = query(this.ordersCollection, where('userId', '==', userId), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data() as Omit<Order, 'id'>, id: doc.id }));
  }

  static async getOrderById(id: string): Promise<Order | null> {
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data() as Omit<Order, 'id'>, id: docSnap.id };
    } else {
      return null;
    }
  }

  static async createOrder(orderData: Omit<Order, 'id' | 'date'>): Promise<string> {
    const docRef = await addDoc(this.ordersCollection, {
        ...orderData,
        date: new Date().toISOString(),
    });
    return docRef.id;
  }

  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
  }
}
