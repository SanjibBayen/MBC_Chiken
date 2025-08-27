import Image from "next/image";
import { Feather, Heart, Truck } from "lucide-react";
import { SHOP_NAME } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div>
      <section className="relative w-full py-20 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
            About {SHOP_NAME}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            Our journey is one of passion for quality and a commitment to serving our community with the freshest chicken possible.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-headline font-bold">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              Founded by Biswajit Halder, {SHOP_NAME} started as a small, local butcher shop in the heart of Kolkata with a simple mission: to provide families with chicken that is not just fresh, but also hygienically handled and trustworthy. We saw a need for a reliable source of high-quality poultry, and we decided to fill it.
            </p>
            <p className="mt-4 text-muted-foreground">
              From our humble beginnings at Kasba C.I.T. Market, we have grown, but our core values remain the same. We believe that good food starts with good ingredients, and we are dedicated to ensuring that every piece of chicken that leaves our shop meets the highest standards of quality and freshness.
            </p>
          </div>
          <div>
            <Image 
              src="https://picsum.photos/600/400?random=12"
              alt="MBC Chicken Shop"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              data-ai-hint="chicken shop"
            />
          </div>
        </div>
      </section>

       <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-headline font-bold">Our Promise</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              We are more than just a chicken shop. We are a part of your daily life, your celebrations, and your family meals. That's a responsibility we take seriously.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <Feather className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-headline font-semibold">Uncompromising Freshness</h3>
              <p className="text-muted-foreground mt-2">We source our chicken daily to guarantee that what you get is always fresh, tender, and flavorful.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-headline font-semibold">Commitment to Hygiene</h3>
              <p className="text-muted-foreground mt-2">Every product is processed and packed in a clean environment, following strict safety protocols.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <Truck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-headline font-semibold">Reliable & Fast Service</h3>
              <p className="text-muted-foreground mt-2">We aim to bring convenience to your doorstep with our fast and dependable delivery service.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
