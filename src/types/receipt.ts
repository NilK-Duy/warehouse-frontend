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
  warehouseName: string;
  location: string;
  attachedDocument: string;
  items: {
    productId: string;
    quantity: number;
    actualQuantity: number;
    unitPrice: number;
  }[];
}