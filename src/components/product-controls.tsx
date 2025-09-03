'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';

interface ProductControlsProps {
    product: Product
}

export function ProductControls({ product }: ProductControlsProps) {
    const { addToCart } = useCart();
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setSelectedVariant(product.variants[0]);
        setQuantity(1);
    }, [product]);

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

    return (
        <>
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
                    disabled={!selectedVariant.stock || selectedVariant.stock < quantity}
                >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {selectedVariant.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </div>
            {selectedVariant.stock < 10 && selectedVariant.stock > 0 &&
                <p className="text-sm text-destructive mt-2">Only {selectedVariant.stock} left in stock!</p>
            }
        </>
    )
}
