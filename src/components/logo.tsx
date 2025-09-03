import Link from 'next/link';
import { Drumstick } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string; }) {
  return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Drumstick className={cn("h-6 w-6")} />
        </div>
      </div>
  );
}
