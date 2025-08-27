"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { PRODUCTS } from '@/lib/products';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'slug'>) => void;
  removeFromCart: (productId: string, variantName: string) => void;
  updateQuantity: (productId: string, variantName: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem('mbc-cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        // localStorage.removeItem('mbc-cart'); // Optional: clear corrupted cart data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mbc-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity' | 'slug'>) => {
    const product = PRODUCTS.find((p) => p.id === itemToAdd.productId);
    if (!product) {
      toast({
        variant: 'destructive',
        title: "Error",
        description: "Could not find product to add to cart.",
      });
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.productId === itemToAdd.productId && item.variantName === itemToAdd.variantName
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.productId === itemToAdd.productId && item.variantName === itemToAdd.variantName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...itemToAdd, quantity: 1, slug: product.slug }];
    });
    toast({
        title: "Added to cart!",
        description: `${itemToAdd.name} (${itemToAdd.variantName}) has been added to your cart.`,
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantName: string) => {
    setCartItems(prevItems => prevItems.filter(
      item => !(item.productId === productId && item.variantName === variantName)
    ));
    toast({
        title: "Item removed",
        variant: "destructive",
    })
  };

  const updateQuantity = (productId: string, variantName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantName);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId && item.variantName === variantName
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
