import { api } from './axios';
import { type Product } from '../types/product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products/list');
  return response.data;
};

export const createProduct = async (
  payload: Omit<Product, 'id'>,
): Promise<Product> => {
  const response = await api.post('/products', payload);
  return response.data;
};
