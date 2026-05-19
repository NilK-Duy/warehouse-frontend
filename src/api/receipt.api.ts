import { api } from './axios';
import { type CreateReceiptPayload } from '../types/receipt';

export const createReceipt = async (
  payload: CreateReceiptPayload,
) => {
  const response = await api.post('/receipts', payload);
  return response.data;
};

export const getReceipts = async () => {
  const response = await api.get('/receipts');
  return response.data;
};

export const getReceiptDetail = async (id: string) => {
  const response = await api.get(`/receipts/${id}`);
  return response.data;
};
