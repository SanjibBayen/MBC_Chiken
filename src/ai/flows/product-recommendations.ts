'use server';

/**
 * @fileOverview A product recommendation AI agent.
 *
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { ProductService } from '@/services/product-service';

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  description: z.string(),
  variants: z.array(z.object({
    name: z.string(),
    price: z.number(),
    originalPrice: z.number().optional(),
    stock: z.number(),
    pieces: z.string(),
    serves: z.number(),
  })),
  images: z.array(z.string()),
  reviews: z.array(z.object({
    id: z.string(),
    author: z.string(),
    rating: z.number(),
    comment: z.string(),
    date: z.string(),
  })),
});


const getProduct = ai.defineTool(
  {
    name: 'getProduct',
    description: 'Returns the full details of a product based on its ID.',
    inputSchema: z.object({
      productId: z.string().describe('The ID of the product to retrieve.'),
    }),
    outputSchema: ProductSchema.nullable(),
  },
  async (input) => {
    console.log(`Getting product details for: ${input.productId}`);
    return await ProductService.getProductById(input.productId);
  }
);


const ProductRecommendationsInputSchema = z.object({
  cartItems: z.array(
    z.object({
      productId: z.string().describe('The ID of the product in the cart.'),
      quantity: z.number().describe('The quantity of the product in the cart.'),
    })
  ).optional().describe('The items currently in the user\'s cart.'),
  orderHistory: z.array(
    z.object({
      productId: z.string().describe('The ID of the product in the order.'),
      quantity: z.number().describe('The quantity of the product in the order.'),
      orderDate: z.string().describe('The date the order was placed.'),
    })
  ).optional().describe('The user\'s past order history.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      productId: z.string().describe('The ID of the recommended product.'),
      reason: z.string().describe('The reason why the product is recommended.'),
    })
  ).describe('A list of product recommendations based on the cart items and order history.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  tools: [getProduct],
  prompt: `You are a product recommendation expert for MBC Chicken Express.

  Based on the customer's current cart items and past order history, you will suggest related products that they might be interested in purchasing.
  Use the getProduct tool to get full details for each product in the cart to understand what the user is buying.
  Explain the reason for each recommendation.

  Current Cart Items:
  {{#if cartItems}}
    {{#each cartItems}}
      - Product ID: {{productId}}, Quantity: {{quantity}}
    {{/each}}
  {{else}}
    No items in cart.
  {{/if}}

  Order History:
  {{#if orderHistory}}
    {{#each orderHistory}}
      - Product ID: {{productId}}, Quantity: {{quantity}}, Order Date: {{orderDate}}
    {{/each}}
  {{else}}
    No order history available.
  {{/if}}

  Based on this information, what products would you recommend?`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationsPrompt(input);
    return output!;
  }
);
