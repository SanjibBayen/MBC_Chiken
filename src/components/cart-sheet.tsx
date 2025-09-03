"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { DELIVERY_CHARGE } from "@/lib/constants";

export function CartSheet() {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, setIsCartOpen } = useCart();

  return (
    <>
      <SheetHeader>
        <SheetTitle>Your Cart ({cartCount})</SheetTitle>
      </SheetHeader>
      {cartCount > 0 ? (
        <div className="flex h-full flex-col justify-between">
          <ScrollArea className="flex-1 pr-4">
            <div className="mt-4 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.variantName}`} className="flex items-start gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                    data-ai-hint="raw chicken"
                  />
                  <div className="flex-1">
                    <Link href={`/products/${item.slug}`} onClick={() => setIsCartOpen(false)}>
                      <h3 className="font-semibold hover:text-primary">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.variantName}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.productId, item.variantName, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.productId, item.variantName, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.productId, item.variantName)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <SheetFooter className="mt-auto border-t pt-4 pr-4">
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{DELIVERY_CHARGE.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{(cartTotal + DELIVERY_CHARGE).toFixed(2)}</span>
              </div>
              <Button asChild size="lg" className="w-full mt-4">
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>Proceed to Checkout</Link>
              </Button>
            </div>
          </SheetFooter>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <ShoppingCart className="h-24 w-24 text-muted-foreground" />
          <h3 className="mt-6 text-xl font-semibold">Your cart is empty</h3>
          <p className="mt-2 text-muted-foreground">Add some fresh chicken to get started!</p>
          <Button asChild className="mt-6" onClick={() => setIsCartOpen(false)}>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </>
  );
}
