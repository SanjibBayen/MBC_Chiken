
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import type { Order } from '@/lib/types';
import { OrderService } from '@/services/order-service';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      // This case is handled by the layout, but as a safeguard.
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setIsLoading(true);
      const userOrders = await OrderService.getOrdersByUserId(user.uid);
      setOrders(userOrders);
      setIsLoading(false);
    };

    fetchOrders();
  }, [user, authLoading]);

  if (isLoading || authLoading) {
    return <OrdersSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {orders.map((order) => (
              <AccordionItem value={order.id} key={order.id}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4 text-left">
                    <div>
                      <p className="font-bold text-sm">
                        Order ID: #{order.id.substring(0, 7)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="font-bold mt-1">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-muted/50 rounded-md">
                  <h4 className="font-semibold mb-2">Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={`${item.productId}-${item.variantName}`}
                        className="flex justify-between items-center text-sm"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded-md"
                            data-ai-hint="raw chicken"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} x {item.variantName}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            You haven't placed any orders yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function OrdersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}
