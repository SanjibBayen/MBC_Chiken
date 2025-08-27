import { ProductCard } from "@/components/product-card";
import { ProductService } from "@/services/product-service";

export default async function ProductsPage() {
  const products = await ProductService.getProducts();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Our Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">The freshest selection, guaranteed.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
