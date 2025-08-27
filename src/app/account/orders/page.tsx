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

const sampleOrders: Order[] = [
  {
    id: 'ORD-12345',
    date: '2023-10-26T10:00:00Z',
    status: 'Delivered',
    total: 310.0,
    deliveryAddress: {
      name: 'Ankita S.',
      address: '123, React Lane',
      city: 'Component City',
      pincode: '700042',
      phone: '9876543210',
    },
    deliverySlot: '6 PM – 9 PM',
    items: [
      {
        productId: '1',
        name: 'Chicken Curry Cut - Small Pieces',
        variantName: '1kg',
        price: 280,
        quantity: 1,
        image: 'https://picsum.photos/600/400?random=1',
        slug: 'chicken-curry-cut-small',
      },
    ],
  },
  {
    id: 'ORD-67890',
    date: '2023-10-20T18:30:00Z',
    status: 'Processing',
    total: 390.0,
    deliveryAddress: {
      name: 'Rohan M.',
      address: '456, Vue Street',
      city: 'State City',
      pincode: '700078',
      phone: '9876543211',
    },
    deliverySlot: '7 AM – 12 PM',
    items: [
      {
        productId: '5',
        name: 'Chicken Breast - Boneless',
        variantName: '500g',
        price: 200,
        quantity: 1,
        image: 'https://picsum.photos/600/400?random=5',
        slug: 'chicken-breast-boneless',
      },
      {
        productId: '4',
        name: 'Chicken Drumsticks',
        variantName: '500g',
        price: 160,
        quantity: 1,
        image: 'https://picsum.photos/600/400?random=4',
        slug: 'chicken-drumsticks',
      },
    ],
  },
];

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {sampleOrders.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {sampleOrders.map(order => (
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
