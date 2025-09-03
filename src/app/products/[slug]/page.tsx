import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product-card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductService } from '@/services/product-service';
import { ProductControls } from '@/components/product-controls';

export default async function ProductDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await ProductService.getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = (await ProductService.getProducts())
    .filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);
    
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
          
          <ProductControls product={product} />
          
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
