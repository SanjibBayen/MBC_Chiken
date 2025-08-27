
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Define a type for the user for better type-safety
interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      pincode: string;
    };
}

export default function AccountPage() {
  // In a real app, this would come from an auth context or API call
  // Setting it to null to represent a logged-out or loading state
  const [user, setUser] = useState<UserProfile | null>(null);

  // TODO: Implement user authentication and fetch user data

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <>
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
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Please log in to view your profile.</p>
            <Button className="mt-4">Login</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
