
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Order } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

const getStatusVariant = (status: Order['status']) => {
    switch (status) {
        case 'Delivered':
        return 'default';
        case 'Processing':
        return 'secondary';
        case 'Cancelled':
        return 'destructive';
        default:
        return 'outline';
    }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  // TODO: Fetch real orders for the logged-in user
  // For now, we'll display an empty state.

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {orders.map(order => (
              <AccordionItem value={order.id} key={order.id}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4">
                    <div className="text-left">
                      <p className="font-bold">Order ID: {order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                       <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                       <p className="font-bold mt-1">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-muted/50 rounded-md">
                   <h4 className="font-semibold mb-2">Items</h4>
                   <div className="space-y-4">
                        {order.items.map(item => (
                            <div key={`${item.productId}-${item.variantName}`} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-4">
                                    <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" data-ai-hint="raw chicken" />
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.quantity} x {item.variantName}</p>
                                    </div>
                                </div>
                                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                   </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
