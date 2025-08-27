
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';

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
    ],
  },
  {
    id: 'ORD-54321',
    date: '2023-10-19T12:00:00Z',
    status: 'Cancelled',
    total: 170.0,
    deliveryAddress: {
      name: 'Priya Dutta',
      address: '789, Angular Ave',
      city: 'Directive District',
      pincode: '700107',
      phone: '9876543212',
    },
    items: [
      {
        productId: '4',
        name: 'Chicken Drumsticks',
        variantName: '500g',
        price: 170,
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
};

export default function AdminOrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Orders</CardTitle>
        <CardDescription>
          View and manage all customer orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.deliveryAddress.name}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  ₹{order.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
