
'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, ShoppingBag, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const accountNavLinks = [
  { href: '/account', label: 'My Profile', icon: User },
  { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);
  
  const handleLogout = async () => {
    await signOut(auth);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/');
  }

  if (loading || !user) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
                <nav className="md:col-span-1 space-y-8">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </nav>
                <main className="md:col-span-3">
                    <Skeleton className="h-96 w-full" />
                </main>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <nav className="md:col-span-1">
           <h1 className="text-2xl font-bold font-headline text-primary mb-6">My Account</h1>
          <ul className="space-y-2">
            {accountNavLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-md transition-colors',
                    pathname === link.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            ))}
             <li>
                <button
                  onClick={handleLogout}
                  className={'flex items-center gap-3 p-3 rounded-md transition-colors w-full hover:bg-muted'}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
          </ul>
        </nav>
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  );
}
