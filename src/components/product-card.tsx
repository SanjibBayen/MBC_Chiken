"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { Plus } from "lucide-react";
import { Badge } from "./ui/badge";

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
      slug: product.slug,
    });
  };

  const discount = defaultVariant.originalPrice
    ? Math.round(((defaultVariant.originalPrice - defaultVariant.price) / defaultVariant.originalPrice) * 100)
    : 0;

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg bg-card border">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block overflow-hidden aspect-video">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="raw chicken"
          />
        </Link>
      </div>
      <CardContent className="flex-1 p-4 flex flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-base leading-tight group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1 flex-1">{product.description}</p>
        
        <div className="text-xs text-muted-foreground mt-2">
            <span>{defaultVariant.name}</span>
            <span className="mx-1.5">|</span>
            <span>{defaultVariant.pieces} Pieces</span>
            <span className="mx-1.5">|</span>
            <span>Serves {defaultVariant.serves}</span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
            <p className="text-base font-bold text-foreground">₹{defaultVariant.price}</p>
            {defaultVariant.originalPrice && (
                 <p className="text-sm text-muted-foreground line-through">₹{defaultVariant.originalPrice}</p>
            )}
            {discount > 0 && (
                 <Badge variant="destructive">{discount}% off</Badge>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
         <p className="text-xs text-muted-foreground">Tomorrow 6AM - 8AM</p>
        {product.variants.length > 1 ? (
          <Button asChild variant="outline" className="w-full">
            <Link href={`/products/${product.slug}`}>Select Options</Link>
          </Button>
        ) : (
          <Button className="w-full" onClick={handleAddToCart}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
