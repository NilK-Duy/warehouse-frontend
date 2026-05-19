import {
  calculateAmount,
  calculateGrandTotal,
} from '../utils/calculation';

describe('calculation utils', () => {
  test('calculateAmount', () => {
    expect(
      calculateAmount(5, 1000),
    ).toBe(5000);
  });

  test('calculateGrandTotal', () => {
    const items = [
      {
        amount: 1000,
      },
      {
        amount: 2000,
      },
    ];

    expect(
      calculateGrandTotal(items as any),
    ).toBe(3000);
  });
});
