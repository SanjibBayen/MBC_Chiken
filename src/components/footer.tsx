
import { CONTACT_EMAIL, CONTACT_PHONE, SHOP_ADDRESS, SHOP_NAME } from "@/lib/constants";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <Logo />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-50">
                    {SHOP_NAME}
                </span>
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Fresh chicken delivered to your door. Fast, Fresh, Instant.
            </p>
            <div className="mt-4 flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" className="text-slate-400 hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" className="text-slate-400 hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
               <Button variant="ghost" size="icon" asChild>
                <Link href="#" className="text-slate-400 hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="text-slate-400 hover:text-primary">All Products</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-primary">Contact</Link></li>
              <li><Link href="/account" className="text-slate-400 hover:text-primary">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Policies</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary">Refund Policy</a></li>
            </ul>
            <p className="text-xs text-slate-500 mt-4">No refund after delivery.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Contact Us</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-slate-400">
              <p>{SHOP_ADDRESS}</p>
              <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary">{CONTACT_EMAIL}</a></p>
              <p>Phone: <a href={`tel:${CONTACT_PHONE}`} className="hover:text-primary">{CONTACT_PHONE}</a></p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p className="mb-4">
            <Button asChild variant="outline">
                <Link href="/admin">Switch to Admin View (Dev)</Link>
            </Button>
          </p>
          <p>&copy; {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
