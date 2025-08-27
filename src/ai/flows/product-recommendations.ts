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
  prompt: `You are a product recommendation expert for MBC Chicken Express.

  Based on the customer's current cart items and past order history, you will suggest related products that they might be interested in purchasing.
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
