import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
    return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
            <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
            <h1 className="text-4xl font-bold font-headline text-primary">Thank You For Your Order!</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                Your order has been placed successfully. You will receive an email confirmation shortly.
                We're getting your fresh chicken ready!
            </p>
            <div className="mt-8 flex gap-4">
                <Button asChild size="lg">
                    <Link href="/account/orders">Track Your Order</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    )
}
