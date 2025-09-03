
'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, ShoppingBag, LogOut, PanelLeft, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const accountNavLinks = [
  { href: '/account', label: 'My Profile', icon: User },
  { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/');
  }

  const getPageTitle = () => {
    const currentLink = accountNavLinks.find(l => pathname === l.href);
    return currentLink ? currentLink.label : 'My Account';
  };
  

  if (loading || !user) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-8">
                <nav className="hidden md:block space-y-8">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </nav>
                <main>
                    <Skeleton className="h-96 w-full" />
                </main>
            </div>
        </div>
    );
  }

  const navContent = (
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
  );

  return (
    <>
      <header className="sticky top-0 z-10 flex h-[60px] items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
            <Link href="/" className="hidden lg:block">
                <Logo />
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <div className="p-4 border-b">
                        <Logo />
                    </div>
                    <nav className="grid gap-2 text-lg font-medium p-4">
                        {navContent}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
          <div className="flex-1">
             <h1 className="text-xl font-semibold">
               {getPageTitle()}
             </h1>
          </div>
      </header>
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-8">
          <nav className="hidden md:block">
            {navContent}
          </nav>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
