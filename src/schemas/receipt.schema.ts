import { z } from 'zod';

export const receiptSchema = z.object({
  receiptNo: z.string().min(1),
  department: z.string().min(1),
  unitName: z.string().min(1),
  deliveryPerson: z.string().min(1),
  warehouseName: z.string().min(1),
  location: z.string().min(1),
  attachedDocument: z.string().min(1),
});
