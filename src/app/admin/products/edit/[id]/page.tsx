
'use client';

import { useEffect, useState } from 'react';
import { ProductForm } from '@/components/admin/product-form';
import { ProductService } from '@/services/product-service';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchProduct = async () => {
        try {
          setIsLoading(true);
          const fetchedProduct = await ProductService.getProductById(params.id);
          if (fetchedProduct) {
            setProduct(fetchedProduct);
          } else {
            setError('Product not found.');
          }
        } catch (e) {
          setError('Failed to fetch product.');
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [params.id]);

  if (isLoading) {
    return (
        <div className="py-6 space-y-6">
            <div className="flex justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-24" />
            </div>
            <Skeleton className="h-96 w-full" />
        </div>
    );
  }

  if (error) {
    return <div className="text-destructive text-center py-10">{error}</div>;
  }

  return (
    <div className="py-6">
        {product && <ProductForm initialData={product} />}
    </div>
  );
}
