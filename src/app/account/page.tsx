
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function AccountPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <AccountSkeleton />;
  }

  if (!user) {
     router.push('/login'); // Should not happen if layout protects it, but as a fallback
     return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Profile</CardTitle>
        <Button variant="outline">Edit Profile</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {userData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{userData.phone || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saved Address</p>
              {userData.address?.street ? (
                <p className="font-medium">
                  {userData.address.street}, {userData.address.city}, {userData.address.pincode}
                </p>
              ): (
                <p className="text-muted-foreground italic">No address saved.</p>
              )}
            </div>
          </>
        ) : (
           <div className="text-center text-muted-foreground py-8">
            <p>Could not load user profile. Please try again later.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AccountSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-64" />
        </div>
      </CardContent>
    </Card>
  )
}
