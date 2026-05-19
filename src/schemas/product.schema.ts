import { z } from 'zod';

export const productSchema = z.object({
  code: z.string().min(1, 'Product code is required'),
  name: z.string().min(1, 'Product name is required'),
  unit: z.string().min(1, 'Unit is required'),
});
