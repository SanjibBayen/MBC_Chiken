import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCTS } from "@/lib/products";
import { ChefHat, Feather, Heart, Star, Truck, ShieldCheck, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";

const categories = [
  { name: 'Fresh Cuts', icon: Feather, description: 'Tender, juicy cuts, ready for your curry.' },
  { name: 'Boneless', icon: ChefHat, description: 'Perfect for grilling, frying, and quick meals.' },
  { name: 'Specialty', icon: Star, description: 'From whole chicken to country varieties.' },
  { name: 'Organ Meats', icon: Heart, description: 'Nutrient-rich options like liver and gizzards.' },
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
      <section className="bg-secondary">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-20 md:py-32">
            <div className="text-center md:text-left">
                 <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
                    Fresh Chicken,
                    <br />
                    <span className="text-primary">Delivered Fast.</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
                    Your one-stop shop for the freshest, highest-quality chicken, hygienically packed and delivered right to your doorstep.
                </p>
                <div className="mt-8 flex justify-center md:justify-start gap-4">
                    <Button asChild size="lg">
                    <Link href="/products">Shop All Products</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                    <Link href="/about">Our Story</Link>
                    </Button>
                </div>
            </div>
            <div className="relative h-64 md:h-96">
                <Image 
                    src="https://picsum.photos/800/600?random=100" 
                    alt="Fresh chicken cuts"
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                    data-ai-hint="raw chicken pieces"
                />
            </div>
        </div>
      </section>
      
      <section id="categories" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Shop by Category</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">From everyday cuts to specialty items, find exactly what you need for your next meal.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Card key={category.name} className="text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-md hover:shadow-xl border-t-4 border-t-primary bg-card">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="mt-4 font-semibold">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-products" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Top Picks for You</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Explore our best-selling products, loved by customers for their freshness and quality.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg" variant="link">
              <Link href="/products">Browse All Products &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Promise to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold">Farm-Fresh Quality</h3>
              <p className="text-muted-foreground mt-2">We source our chicken daily to ensure you receive only the freshest products for your family.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <ShieldCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold">Hygienically Packed</h3>
              <p className="text-muted-foreground mt-2">Your health is our priority. All our products are handled and packed with the utmost care.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <Truck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold">Lightning-Fast Delivery</h3>
              <p className="text-muted-foreground mt-2">Get your order within hours. We cover pin codes 42, 78, 107, and 19 with a flat ₹30 delivery fee.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col justify-center items-center text-center p-6 bg-card shadow-lg">
                 <Image src={testimonial.avatar} alt={testimonial.name} width={80} height={80} className="rounded-full mb-4 border-2 border-primary" data-ai-hint="person" />
                <CardContent>
                  <p className="italic text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                  <p className="font-bold mt-4">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
