
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { ProductService } from '@/services/product-service';
import { Trash } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  slug: z.string().min(3, 'Slug is required.').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with dashes.'),
  category: z.string().min(3, 'Category is required.'),
  description: z.string().min(10, 'Description is too short.'),
  images: z.array(z.string().url()).min(1, 'At least one image URL is required.'),
  variants: z.array(
    z.object({
      name: z.string().min(1, 'Variant name is required.'),
      price: z.coerce.number().positive('Price must be positive.'),
      originalPrice: z.coerce.number().optional(),
      stock: z.coerce.number().int().min(0, 'Stock cannot be negative.'),
      pieces: z.string().optional(),
      serves: z.coerce.number().optional(),
    })
  ).min(1, 'At least one product variant is required.'),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      category: '',
      description: '',
      images: [''],
      variants: [{ name: '', price: 0, originalPrice: 0, stock: 0, pieces: '', serves: 0 }],
    },
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: 'images',
  });
  
  const title = initialData ? 'Edit Product' : 'Create Product';
  const description = initialData ? 'Update the details of your product.' : 'Add a new product to your inventory.';
  const actionLabel = initialData ? 'Save Changes' : 'Create Product';

  async function onSubmit(data: ProductFormValues) {
    try {
      if (initialData) {
        await ProductService.updateProduct(initialData.id, data);
        toast({
          title: 'Product Updated',
          description: `The product "${data.name}" has been successfully updated.`,
        });
      } else {
        await ProductService.createProduct(data as Omit<Product, 'id' | 'reviews'>);
        toast({
          title: 'Product Created',
          description: `The product "${data.name}" has been successfully created.`,
        });
      }
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Something went wrong. Please try again.',
      });
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : actionLabel}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide the core details of the product.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                       <FormDescription>Unique identifier for the product URL.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Fresh Cuts">Fresh Cuts</SelectItem>
                          <SelectItem value="Boneless">Boneless</SelectItem>
                          <SelectItem value="Specialty">Specialty</SelectItem>
                           <SelectItem value="Organ Meats">Organ Meats</SelectItem>
                           <SelectItem value="More">More</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea {...field} rows={5} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Add image URLs for your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {imageFields.map((field, index) => (
                    <FormField
                        key={field.id}
                        control={form.control}
                        name={`images.${index}`}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-2">
                                     <FormControl><Input {...field} placeholder="https://example.com/image.png" /></FormControl>
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}><Trash /></Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="button" variant="outline" onClick={() => appendImage('')}>Add Image</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>Define the different options for this product, like size or weight.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {variantFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             <FormField control={form.control} name={`variants.${index}.name`} render={({ field }) => (
                                <FormItem><FormLabel>Variant Name</FormLabel><FormControl><Input {...field} placeholder="e.g., 500g" /></FormControl><FormMessage /></FormItem>
                             )} />
                             <FormField control={form.control} name={`variants.${index}.price`} render={({ field }) => (
                                <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                              <FormField control={form.control} name={`variants.${index}.originalPrice`} render={({ field }) => (
                                <FormItem><FormLabel>Original Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                              <FormField control={form.control} name={`variants.${index}.stock`} render={({ field }) => (
                                <FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                              <FormField control={form.control} name={`variants.${index}.pieces`} render={({ field }) => (
                                <FormItem><FormLabel>Pieces</FormLabel><FormControl><Input {...field} placeholder="e.g., 10-12" /></FormControl><FormMessage /></FormItem>
                             )} />
                              <FormField control={form.control} name={`variants.${index}.serves`} render={({ field }) => (
                                <FormItem><FormLabel>Serves</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                         </div>
                         <Button
                            type="button"
                            variant="destructive"
                            className="absolute -top-3 -right-3 h-7 w-7 p-1"
                            onClick={() => removeVariant(index)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                 <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendVariant({ name: '', price: 0, originalPrice: 0, stock: 0, pieces: '', serves: 0 })}
                    >
                    Add Variant
                </Button>
            </CardContent>
        </Card>
      </form>
    </Form>
  );
}
