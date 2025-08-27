"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";

export default function ProductDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product.id,
        name: product.name,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        image: product.images[0],
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
             <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint="raw chicken"
              />
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{product.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{product.category}</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
          </div>

          <p className="mt-6 text-foreground/80">{product.description}</p>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Select Weight</h3>
            <RadioGroup
              defaultValue={selectedVariant.name}
              onValueChange={(value) => {
                const newVariant = product.variants.find(v => v.name === value);
                if (newVariant) setSelectedVariant(newVariant);
              }}
              className="mt-4 flex flex-wrap gap-4"
            >
              {product.variants.map((variant) => (
                <div key={variant.name}>
                  <RadioGroupItem value={variant.name} id={variant.name} className="peer sr-only" />
                  <Label
                    htmlFor={variant.name}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <span>{variant.name}</span>
                    <span className="font-bold">₹{variant.price}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-8 flex items-center gap-4">
             <div className="flex items-center gap-2 border rounded-md p-2">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
             </div>
             <Button size="lg" onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
             </Button>
          </div>
        </div>
      </div>

      <Separator className="my-16" />

      <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold font-headline mb-8">Customer Reviews</h2>
            <div className="space-y-6">
                {product.reviews.length > 0 ? product.reviews.map(review => (
                    <Card key={review.id}>
                        <CardHeader className="flex-row justify-between items-center">
                            <div>
                                <CardTitle className="text-base">{review.author}</CardTitle>
                                <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/80">{review.comment}</p>
                        </CardContent>
                    </Card>
                )) : <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold font-headline mb-4">Post a review</h3>
             <Button>Write a Review</Button>
          </div>
      </div>

       <Separator className="my-16" />

       <div>
          <h2 className="text-2xl font-bold font-headline text-center mb-12">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
       </div>

    </div>
  );
}
