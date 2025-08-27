"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const defaultVariant = product.variants[0];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      variantName: defaultVariant.name,
      price: defaultVariant.price,
      image: product.images[0],
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`} className="block overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={400}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="raw chicken"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="text-base font-bold leading-tight hover:text-primary">
            {product.name}
          </CardTitle>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">{product.category}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">₹{defaultVariant.price}</p>
        {product.variants.length > 1 ? (
          <Button asChild variant="outline" size="sm">
            <Link href={`/products/${product.slug}`}>View Options</Link>
          </Button>
        ) : (
          <Button size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
