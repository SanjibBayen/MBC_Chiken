
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ShoppingCart, User, MapPin, ChevronDown, Layers, Phone } from "lucide-react";
import { Logo } from "./logo";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SHOP_ADDRESS, SHOP_NAME, CONTACT_PHONE, SHOP_SLOGAN } from "@/lib/constants";
import { CartSheet } from "@/components/cart-sheet";
import { CategoryMenu } from "./category-menu";

function ClientOnlyCart() {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  
  return (
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="relative flex items-center gap-2 px-2 hover:bg-transparent">
             <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0"
                >
                    {cartCount}
                </Badge>
                )}
             </div>
             <span className="hidden md:block">Cart</span>
            <span className="sr-only">Open Cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <CartSheet />
        </SheetContent>
      </Sheet>
  )
}


export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Top bar */}
       <div className="bg-foreground text-background text-xs py-1.5">
         <div className="container flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>{CONTACT_PHONE}</span>
            </div>
            <span className="font-medium tracking-wide">{SHOP_SLOGAN}</span>
         </div>
       </div>

      <div className="container flex h-20 items-center justify-between gap-6">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <div className="p-4">
                <Logo />
              </div>
              <nav className="mt-4 flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-lg font-medium hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Logo & Location */}
        <div className="hidden md:flex items-center gap-4">
          <Logo />
           <div className="border-l pl-4">
             <div className="flex items-center gap-1 font-bold text-sm cursor-pointer hover:text-primary">
                <MapPin className="h-4 w-4 text-primary"/>
                <span>Kolkata</span>
                <ChevronDown className="h-4 w-4" />
             </div>
             <p className="text-xs text-muted-foreground max-w-xs truncate">{SHOP_ADDRESS}</p>
           </div>
        </div>

        {/* Search Bar (Centered) */}
        <div className="flex-1 w-full max-w-xl hidden md:block">
            <div className="relative">
                <Input placeholder="Search for any delicious product..." className="pl-4 pr-10 h-11" />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                     <Search className="h-5 w-5 text-muted-foreground" />
                </Button>
            </div>
        </div>

        <div className="flex items-center gap-1">
            <CategoryMenu />
            <Button asChild variant="ghost" className="flex items-center gap-2 px-2 hover:bg-transparent">
                <Link href="/account">
                <User className="h-6 w-6" />
                <span className="hidden md:block">Login</span>
                </Link>
            </Button>
          
          {isMounted ? <ClientOnlyCart /> : <Button variant="ghost" className="relative flex items-center gap-2 px-2 hover:bg-transparent" disabled><ShoppingCart className="h-6 w-6" /><span className="hidden md:block">Cart</span></Button>}
        </div>
      </div>
       <div className="container pb-2 md:hidden">
         <div className="relative">
            <Input placeholder="Search for any delicious product..." className="pl-4 pr-10 h-11" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                    <Search className="h-5 w-5 text-muted-foreground" />
            </Button>
        </div>
       </div>
    </header>
  );
}
