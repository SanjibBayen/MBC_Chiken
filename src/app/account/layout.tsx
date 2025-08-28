
'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, ShoppingBag, LogOut, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

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
    <>
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <Link href="/" className="md:hidden">
            <Button variant="outline" size="icon" className="h-8 w-8">
                <PanelLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
             <h1 className="text-xl font-semibold">
               My Account
             </h1>
          </div>
      </header>
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid md:grid-cols-4 gap-8">
          <nav className="md:col-span-1">
            <ul className="space-y-2">
              {accountNavLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-md transition-colors text-sm font-medium',
                      pathname === link.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                  <button
                    onClick={handleLogout}
                    className={'w-full flex items-center gap-3 p-3 rounded-md transition-colors text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground'}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </li>
            </ul>
          </nav>
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </>
  );
}
