import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCTS } from "@/lib/products";
import { ChefHat, Feather, Heart, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";

const categories = [
  { name: 'Fresh Cuts', icon: Feather, description: 'Tender, juicy cuts, ready for your curry.' },
  { name: 'Boneless', icon: ChefHat, description: 'Perfect for grilling, frying, and quick meals.' },
  { name: 'Specialty', icon: Star, description: 'From whole chicken to country varieties.' },
  { name: 'More', icon: Heart, description: 'Including healthy options and pet food.' },
];

const testimonials = [
  {
    name: 'Ankita S.',
    quote: 'The chicken is always fresh and delivery is super fast. MBC is my go-to for weekly groceries!',
    avatar: 'https://picsum.photos/100/100?random=1',
  },
  {
    name: 'Rohan M.',
    quote: 'I love the quality of their boneless breast. It makes my meal prep so much easier and tastier.',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
    {
    name: 'Priya Dutta',
    quote: 'The scheduled delivery is a lifesaver for my busy schedule. The chicken always arrives perfectly chilled.',
    avatar: 'https://picsum.photos/100/100?random=3',
  },
];

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
            MBC Chicken Express
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary/90 font-semibold">
            Fast - Fresh - Instant
          </p>
          <p className="mt-2 max-w-3xl mx-auto text-muted-foreground">
            Your one-stop shop for the freshest, highest-quality chicken, delivered right to your doorstep.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section id="categories" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Card key={category.name} className="text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl border-t-4 border-t-primary">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="mt-4 font-headline">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-products" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg" variant="link">
              <Link href="/products">View All Products &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm">
              <Truck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-headline font-semibold">Lightning-Fast Delivery</h3>
              <p className="text-muted-foreground mt-2">Get your order within hours. We cover pin codes 42, 78, 107, and 19 with a flat ₹30 delivery fee.</p>
            </div>
            <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm">
              <Feather className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-headline font-semibold">Farm-Fresh Quality</h3>
              <p className="text-muted-foreground mt-2">We source our chicken daily to ensure you receive only the freshest products for your family.</p>
            </div>
            <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm">
              <Star className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-headline font-semibold">Customer-Approved</h3>
              <p className="text-muted-foreground mt-2">Loved by our customers for consistent quality and reliable service. Your satisfaction is our priority.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col justify-center items-center text-center p-6">
                 <Image src={testimonial.avatar} alt={testimonial.name} width={80} height={80} className="rounded-full mb-4 border-2 border-primary" data-ai-hint="person" />
                <CardContent>
                  <p className="italic text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                  <p className="font-bold mt-4 font-headline">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
