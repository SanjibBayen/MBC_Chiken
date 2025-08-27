'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, ShoppingBag, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const accountNavLinks = [
  { href: '/account', label: 'My Profile', icon: User },
  { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline text-primary mb-8">My Account</h1>
      <div className="grid md:grid-cols-4 gap-8">
        <nav className="md:col-span-1">
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
