
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ShoppingCart, User, MapPin, ChevronDown, Bell, LogOut } from "lucide-react";
import { Logo } from "./logo";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { CONTACT_PHONE, SHOP_SLOGAN } from "@/lib/constants";
import { CartSheet } from "@/components/cart-sheet";
import { CategoryMenu } from "./category-menu";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function ClientOnlyCart() {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
     return <Button variant="ghost" className="relative flex items-center gap-2 px-2" disabled><ShoppingCart className="h-6 w-6" /><span className="hidden md:block">Cart</span></Button>;
  }
  
  return (
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="relative flex items-center gap-2 px-2">
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
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/');
  }

  // Hide header on admin and account pages for a focused experience
  if (pathname.startsWith('/admin') || pathname.startsWith('/account')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Top bar */}
       <div className="bg-foreground text-background text-xs py-1.5">
         <div className="container flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>{CONTACT_PHONE}</span>
            </div>
            <span className="font-medium tracking-wide hidden sm:block">{SHOP_SLOGAN}</span>
         </div>
       </div>

      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
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
           <Logo />
        </div>

        {/* Desktop Nav */}
        <nav className="items-center gap-6 hidden md:flex">
            {navLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === link.href ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                )}
            >
                {link.label}
            </Link>
            ))}
        </nav>


        <div className="flex flex-1 items-center justify-end gap-2">
             <div className="w-full max-w-sm hidden md:block">
                <div className="relative">
                    <Input placeholder="Search for any delicious product..." className="pl-4 pr-10 h-10" />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                        <Search className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
            </div>

            {loading ? (
              <Button variant="ghost" className="flex items-center gap-2 px-2" disabled>
                <User className="h-6 w-6" />
                <span className="hidden md:block">...</span>
              </Button>
            ) : user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2">
                            <User className="h-6 w-6" />
                            <span className="hidden md:block">Account</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/account">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/account/orders">Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                           <LogOut className="mr-2 h-4 w-4" />
                           Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild variant="ghost" className="flex items-center gap-2 px-2">
                    <Link href="/login">
                    <User className="h-6 w-6" />
                    <span className="hidden md:block">Login</span>
                    </Link>
                </Button>
            )}
          
          <ClientOnlyCart />
        </div>
      </div>
       <div className="container pb-4 md:hidden">
         <div className="relative">
            <Input placeholder="Search..." className="pl-4 pr-10 h-10" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                    <Search className="h-5 w-5 text-muted-foreground" />
            </Button>
        </div>
       </div>
    </header>
  );
}
