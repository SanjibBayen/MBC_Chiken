
import type { Order } from '@/lib/types';
import { PRODUCTS_TO_SEED } from '@/lib/products';

// In-memory array to store orders
let dummyOrders: Order[] = [
    {
        id: 'ord12345',
        userId: 'dummy-user-id-123',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        items: [
            { 
                productId: '1', 
                name: PRODUCTS_TO_SEED[0].name, 
                slug: PRODUCTS_TO_SEED[0].slug,
                image: PRODUCTS_TO_SEED[0].images[0],
                variantName: '500g', 
                quantity: 1, 
                price: 160 
            },
            { 
                productId: '5', 
                name: PRODUCTS_TO_SEED[4].name, 
                slug: PRODUCTS_TO_SEED[4].slug,
                image: PRODUCTS_TO_SEED[4].images[0],
                variantName: '500g', 
                quantity: 2, 
                price: 252 
            },
        ],
        total: 160 + (2 * 252) + 30, // items + delivery charge
        status: 'Delivered',
        deliveryAddress: {
            name: 'Dummy User',
            address: '123, CIT Market, Kasba',
            city: 'Kolkata',
            pincode: '700042',
            phone: '9876543210'
        },
        deliverySlot: '7 AM – 12 PM',
    },
     {
        id: 'ord67890',
        userId: 'dummy-user-id-123',
        date: new Date().toISOString(), // Today
        items: [
            { 
                productId: '4', 
                name: PRODUCTS_TO_SEED[3].name, 
                slug: PRODUCTS_TO_SEED[3].slug,
                image: PRODUCTS_TO_SEED[3].images[0],
                variantName: '1kg', 
                quantity: 1, 
                price: 320 
            },
        ],
        total: 320 + 30,
        status: 'Processing',
        deliveryAddress: {
            name: 'Dummy User',
            address: '123, CIT Market, Kasba',
            city: 'Kolkata',
            pincode: '700042',
            phone: '9876543210'
        },
        deliverySlot: '6 PM – 9 PM',
    }
];

export class OrderService {
  static async getOrders(): Promise<Order[]> {
    console.log("Admin fetching all dummy orders");
    // Return a copy to prevent mutation
    return Promise.resolve([...dummyOrders].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }
  
  static async getOrdersByUserId(userId: string): Promise<Order[]> {
    console.log(`Fetching dummy orders for user: ${userId}`);
    const userOrders = dummyOrders.filter(order => order.userId === userId);
     return Promise.resolve([...userOrders].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  static async getOrderById(id: string): Promise<Order | null> {
    const order = dummyOrders.find(o => o.id === id) || null;
    return Promise.resolve(order);
  }

  static async createOrder(orderData: Omit<Order, 'id' | 'date'>): Promise<string> {
    const newOrder: Order = {
        ...orderData,
        id: `ord${Math.random().toString(36).substring(2, 9)}`,
        date: new Date().toISOString(),
    };
    dummyOrders.push(newOrder);
    console.log("New dummy order created:", newOrder);
    return Promise.resolve(newOrder.id);
  }

  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    dummyOrders = dummyOrders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    console.log(`Updated dummy order ${orderId} status to ${status}`);
    return Promise.resolve();
  }
}
