import { CONTACT_EMAIL, CONTACT_PHONE, SHOP_ADDRESS, SHOP_NAME } from "@/lib/constants";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo inFooter />
            <p className="mt-4 text-sm text-accent-foreground/80">
              Fresh chicken delivered to your door. Fast, Fresh, Instant.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-accent-foreground/80 hover:text-primary-foreground">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-accent-foreground/80 hover:text-primary-foreground">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-accent-foreground/80 hover:text-primary-foreground">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-primary-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="text-accent-foreground/80 hover:text-primary-foreground">All Products</Link></li>
              <li><Link href="/about" className="text-accent-foreground/80 hover:text-primary-foreground">About Us</Link></li>
              <li><Link href="/contact" className="text-accent-foreground/80 hover:text-primary-foreground">Contact</Link></li>
              <li><Link href="/account" className="text-accent-foreground/80 hover:text-primary-foreground">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-primary-foreground">Policies</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-accent-foreground/80 hover:text-primary-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-accent-foreground/80 hover:text-primary-foreground">Terms of Service</a></li>
              <li><a href="#" className="text-accent-foreground/80 hover:text-primary-foreground">Refund Policy</a></li>
               <li><Link href="/admin" className="text-accent-foreground/80 hover:text-primary-foreground">Admin Login</Link></li>
            </ul>
            <p className="text-xs text-accent-foreground/60 mt-4">No refund after delivery.</p>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-primary-foreground">Contact Us</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-accent-foreground/80">
              <p>{SHOP_ADDRESS}</p>
              <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary-foreground">{CONTACT_EMAIL}</a></p>
              <p>Phone: <a href={`tel:${CONTACT_PHONE}`} className="hover:text-primary-foreground">{CONTACT_PHONE}</a></p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-accent-foreground/20 pt-8 text-center text-sm text-accent-foreground/60">
          <p>&copy; {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
