'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import type { ProductRecommendationsOutput } from '@/ai/flows/product-recommendations';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProductService } from '@/services/product-service';
import type { Product } from '@/lib/types';

export function ProductRecommendations() {
  const { cartItems, addToCart, setIsCartOpen } = useCart();
  const [recommendations, setRecommendations] = useState<ProductRecommendationsOutput['recommendations']>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsLoading(true);
      const fetchRecommendations = async () => {
        try {
          const cartData = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          }));
          const result = await getProductRecommendations({ cartItems: cartData });
          setRecommendations(result.recommendations);

          const productPromises = result.recommendations.map(rec => ProductService.getProductById(rec.productId));
          const products = (await Promise.all(productPromises)).filter((p): p is Product => p !== null);
          setRecommendedProducts(products);

        } catch (error) {
          console.error('Failed to get product recommendations:', error);
          toast({
            variant: 'destructive',
            title: 'AI Error',
            description: 'Could not fetch AI recommendations.',
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecommendations();
    } else {
      setRecommendations([]);
      setRecommendedProducts([]);
    }
  }, [cartItems, toast]);

  if (isLoading) {
    return <RecommendationSkeleton />;
  }

  if (recommendations.length === 0 || recommendedProducts.length === 0) {
    return null;
  }
  
  const handleAddToCart = (product: Product) => {
    if(product) {
        const defaultVariant = product.variants[0];
        addToCart({
            productId: product.id,
            name: product.name,
            variantName: defaultVariant.name,
            price: defaultVariant.price,
            image: product.images[0],
            slug: product.slug,
        })
    }
  }


  return (
    <div className="space-y-4">
      <h4 className="font-semibold flex items-center gap-2">
        <Wand2 className="h-5 w-5 text-primary" />
        You Might Also Like
      </h4>
      <div className="space-y-4">
        {recommendedProducts.map(product => {
          const recommendation = recommendations.find(r => r.productId === product.id);
          if (!recommendation) return null;

          return (
            <div key={product.id} className="flex gap-4 items-start bg-secondary/50 p-3 rounded-lg">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
                data-ai-hint="raw chicken"
              />
              <div className="flex-1">
                <Link href={`/products/${product.slug}`} onClick={() => setIsCartOpen(false)}>
                    <p className="font-semibold text-sm hover:text-primary">{product.name}</p>
                </Link>
                <p className="text-xs text-muted-foreground italic mt-1">&quot;{recommendation.reason}&quot;</p>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-bold text-primary">₹{product.variants[0].price}</p>
                    <Button size="sm" variant="outline" onClick={() => handleAddToCart(product)}>
                        Add
                    </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecommendationSkeleton() {
  return (
     <div className="space-y-4">
      <h4 className="font-semibold flex items-center gap-2">
        <Wand2 className="h-5 w-5 text-primary" />
        You Might Also Like
      </h4>
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4 items-start bg-secondary/50 p-3 rounded-lg">
                <Skeleton className="h-[60px] w-[60px] rounded-md" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}
