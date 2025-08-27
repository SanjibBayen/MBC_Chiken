
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
import { useEffect, useState } from 'react';
import { OrderService } from '@/services/order-service';
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
        setIsLoading(true);
        const allOrders = await OrderService.getOrders();
        setOrders(allOrders);
        setIsLoading(false);
    }
    fetchOrders();
  }, []);

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
            {isLoading ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                       <div className="flex justify-center items-center">
                        <Skeleton className="h-8 w-1/2" />
                       </div>
                    </TableCell>
                </TableRow>
            ) : orders.length > 0 ? (
              orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.substring(0, 7)}</TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
