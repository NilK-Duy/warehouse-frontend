import { useMemo } from 'react';

import { type ReceiptItemForm } from '../types/receipt';

export const useReceiptCalculation = (
  items: ReceiptItemForm[],
) => {
  const grandTotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.amount,
      0,
    );
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [items]);

  return {
    grandTotal,
    totalQuantity,
  };
};
