
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DELIVERY_CHARGE, DELIVERY_TIMINGS } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "A valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  city: z.string().min(2, "City is required"),
  deliverySlot: z.string().optional(),
  paymentMethod: z.enum(["cod", "upi", "card"], {
    required_error: "You need to select a payment method.",
  }),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
    },
  });

  useEffect(() => {
    if(!loading && !user) {
        router.replace('/login?redirect=/checkout');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if(userData) {
      form.reset({
        name: userData.name,
        phone: userData.phone,
        address: userData.address?.street,
        pincode: userData.address?.pincode,
        city: userData.address?.city,
        paymentMethod: 'cod'
      })
    }
  }, [userData, form]);


  useEffect(() => {
    // Redirect if cart is empty after auth check is complete
    if(!loading && cartItems.length === 0) {
      router.replace('/products');
    }
  }, [cartItems, router, loading]);

  if (loading || !user) {
    return (
        <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-10 w-48 mx-auto mb-12" />
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
                <div>
                    <Skeleton className="h-96 w-full sticky top-24" />
                </div>
            </div>
        </div>
    );
  }

  function onSubmit(values: z.infer<typeof checkoutSchema>) {
    console.log("Order placed:", values);
    toast({
      title: "Order Placed!",
      description: "Thank you for your order. We've received it and will process it shortly.",
    });
    clearCart();
    router.push('/order-confirmation');
  }

  const grandTotal = cartTotal + DELIVERY_CHARGE;

  return (
    <div className="container mx-auto px-4 py-12">
       <h1 className="text-4xl font-bold font-headline text-center mb-12 text-primary">Checkout</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input placeholder="9876543210" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl><Input placeholder="123, Main St" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                 <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Kolkata" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="pincode" render={({ field }) => (
                      <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="700042" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                 </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle>Delivery Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField control={form.control} name="deliverySlot" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Delivery Slot</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select a delivery time" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {DELIVERY_TIMINGS.map(slot => (
                                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
              <CardContent>
                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                                <Label className="flex items-center space-x-2 border p-4 rounded-md has-[input:checked]:border-primary">
                                    <RadioGroupItem value="cod" /><span>Cash on Delivery (COD)</span>
                                </Label>
                                <Label className="flex items-center space-x-2 border p-4 rounded-md has-[input:checked]:border-primary">
                                    <RadioGroupItem value="upi" /><span>UPI</span>
                                </Label>
                                <Label className="flex items-center space-x-2 border p-4 rounded-md has-[input:checked]:border-primary">
                                    <RadioGroupItem value="card" /><span>Credit/Debit Card</span>
                                </Label>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>

          <div>
             <Card className="sticky top-24">
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {cartItems.map(item => (
                            <div key={`${item.productId}-${item.variantName}`} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" data-ai-hint="raw chicken" />
                                    <div>
                                        <p className="font-medium text-sm">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.quantity} x {item.variantName}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                         <div className="flex justify-between text-sm"><p>Subtotal</p><p>₹{cartTotal.toFixed(2)}</p></div>
                         <div className="flex justify-between text-sm"><p>Delivery Fee</p><p>₹{DELIVERY_CHARGE.toFixed(2)}</p></div>
                         <Separator className="my-2" />
                         <div className="flex justify-between font-bold text-lg"><p>Total</p><p>₹{grandTotal.toFixed(2)}</p></div>
                    </div>
                    <Button type="submit" size="lg" className="w-full mt-6" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </Button>
                </CardContent>
             </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
