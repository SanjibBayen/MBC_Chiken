
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronRight, Drumstick, Layers } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import Image from "next/image";
import { cn } from "@/lib/utils";

const mainCategories = [
  {
    name: "Chicken",
    icon: (
      <Image
        src="https://picsum.photos/100/100?random=50"
        alt="Chicken"
        width={40}
        height={40}
        className="rounded-full"
        data-ai-hint="raw chicken"
      />
    ),
    subCategories: [
      "Fresh Cuts",
      "Boneless",
      "Specialty",
      "Organ Meats",
      "More",
    ],
  },
];

export function CategoryMenu() {
  const [activeCategory, setActiveCategory] = React.useState(
    mainCategories[0].name
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const activeSubCategories = mainCategories.find(
    (c) => c.name === activeCategory
  )?.subCategories;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="hidden md:flex items-center gap-2 px-2 hover:bg-transparent">
          <Layers className="h-6 w-6" />
          <span>Categories</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-screen max-w-2xl mt-1"
        align="start"
        sideOffset={10}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1 border-r pr-2">
            <h3 className="font-bold text-lg px-4 py-2">Categories</h3>
            <ul>
              {mainCategories.map((category) => (
                <li key={category.name}>
                  <button
                    onMouseEnter={() => setActiveCategory(category.name)}
                    className={cn(
                      "w-full flex items-center gap-3 text-left p-3 rounded-md transition-colors",
                       activeCategory === category.name ? 'bg-muted font-semibold' : 'hover:bg-muted/50'
                    )}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
             <h3 className="font-bold text-lg px-4 py-2">{activeCategory}</h3>
             <ul className="px-4 py-2">
                {activeSubCategories?.map(sub => (
                    <li key={sub}>
                         <Link 
                            href="/products" 
                            className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50"
                            onClick={() => setIsOpen(false)}
                         >
                            <span>{sub}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    </li>
                ))}
             </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
