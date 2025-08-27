
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-2 text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            <div className="ml-2">
                {item.href ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                    </Link>
                ) : (
                    <span className="font-medium text-foreground">{item.label}</span>
                )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
