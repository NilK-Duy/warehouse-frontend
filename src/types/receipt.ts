import { type Product } from './product';

export interface ReceiptItemForm {
  productId: string;
  product: Product;
  quantity: number;
  actualQuantity: number;
  unitPrice: number;
  amount: number;
}

export interface CreateReceiptPayload {
  receiptNo: string;
  department: string;
  unitName: string;
  deliveryPerson: string;
  importReason: string;
  warehouseName: string;
  location: string;
  documentCount: number;
  items: {
    productId: string;
    quantity: number;
    actualQuantity: number;
    unitPrice: number;
  }[];
}