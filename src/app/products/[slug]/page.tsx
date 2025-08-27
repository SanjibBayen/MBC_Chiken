
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import { Star, Minus, Plus, ShoppingCart, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product-card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductService } from '@/services/product-service';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const fetchedProduct = await ProductService.getProductBySlug(slug);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        const fetchedRelatedProducts = await ProductService.getProducts();
        setRelatedProducts(
          fetchedRelatedProducts
            .filter(
              (p) =>
                p.category === fetchedProduct.category && p.id !== fetchedProduct.id
            )
            .slice(0, 4)
        );
      } else {
        notFound();
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [slug]);

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (isLoading || !product || !selectedVariant) {
    return <ProductDetailSkeleton />;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product.id,
        name: product.name,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        image: product.images[0],
        slug: product.slug,
      });
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: product.category, href: '/products' },
    { label: product.name },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="grid md:grid-cols-2 gap-12 mt-6">
        <div>
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg bg-white">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
              data-ai-hint="raw chicken"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline">
            {product.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {product.category}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <p className="mt-6 text-foreground/80">{product.description}</p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Select Weight</h3>
            <RadioGroup
              defaultValue={selectedVariant.name}
              onValueChange={(value) => {
                const newVariant = product.variants.find(
                  (v) => v.name === value
                );
                if (newVariant) setSelectedVariant(newVariant);
              }}
              className="mt-4 flex flex-wrap gap-4"
            >
              {product.variants.map((variant) => (
                <div key={variant.name}>
                  <RadioGroupItem
                    value={variant.name}
                    id={variant.name}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={variant.name}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer min-w-[100px]"
                  >
                    <span>{variant.name}</span>
                    <span className="font-bold mt-1">₹{variant.price}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold text-lg">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="flex-1 h-12"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-16" />

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold font-headline mb-8">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader className="flex-row justify-between items-center pb-2">
                    <div>
                      <CardTitle className="text-base">{review.author}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold font-headline mb-4">
            Post a review
          </h3>
          <Button>Write a Review</Button>
        </div>
      </div>

      <Separator className="my-16" />

      <div>
        <h2 className="text-2xl font-bold font-headline text-center mb-12">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}


function ProductDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-1/2 mb-6" />
        <div className="grid md:grid-cols-2 gap-12 mt-6">
            <div>
                <Skeleton className="aspect-square w-full rounded-lg" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-4">
                    <Skeleton className="h-12 w-24" />
                    <Skeleton className="h-12 w-24" />
                    <Skeleton className="h-12 w-24" />
                </div>
                 <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-12 flex-1" />
                 </div>
            </div>
        </div>
        </div>
    )
}
