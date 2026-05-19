import { type ReceiptItemForm } from '../types/receipt';

export const calculateAmount = (
  quantity: number,
  unitPrice: number,
) => {
  return quantity * unitPrice;
};

export const calculateGrandTotal = (
  items: ReceiptItemForm[],
) => {
  return items.reduce((acc, item) => acc + item.amount, 0);
};
