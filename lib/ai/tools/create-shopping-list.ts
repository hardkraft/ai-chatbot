import { tool } from 'ai';
import { z } from 'zod';

export const createShoppingList = tool({
  description: 'Create a shopping list from a prompt',
  parameters: z.object({
    items: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        purchased: z.boolean(),
      })
    ),
  }),
  execute: async ({ items }) => {
    return items;
  },
});
