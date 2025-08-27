import Link from 'next/link';
import { Drumstick } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SHOP_NAME } from '@/lib/constants';

export function Logo({ className, inFooter = false }: { className?: string; inFooter?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Drumstick className={cn("h-7 w-7", inFooter ? "text-primary-foreground" : "text-primary")} />
      <span className={cn(
        "text-xl font-bold tracking-tight",
        inFooter ? "text-primary-foreground" : "text-primary"
      )}>
        {SHOP_NAME}
      </span>
    </Link>
  );
}
