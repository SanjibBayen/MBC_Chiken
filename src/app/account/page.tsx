'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const user = {
    name: 'Biswajit Halder',
    email: 'mbcchicken@gmail.com',
    phone: '9007920161',
    address: {
      street: '12 B.B. CHATTERJEE ROAD, KASBA C.I.T. MARKET',
      city: 'KOLKATA',
      pincode: '700042',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p className="font-medium">{user.phone}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Saved Address</p>
          <p className="font-medium">
            {user.address.street}, {user.address.city}, {user.address.pincode}
          </p>
        </div>
        <Button>Edit Profile</Button>
      </CardContent>
    </Card>
  );
}
