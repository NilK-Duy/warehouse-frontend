import { useMemo, useState } from 'react';
import { type Product } from '../../types/product';

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
  onCreateNew: () => void;
}

const ProductSearch = ({
  products,
  onSelect,
  onCreateNew,
}: Props) => {
  const [keyword, setKeyword] = useState('');
  const [open, setOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(keyword.toLowerCase()) ||
        product.code
          .toLowerCase()
          .includes(keyword.toLowerCase()),
    );
  }, [keyword, products]);

  return (
    <div className='relative'>
      <input
        value={keyword}
        onFocus={() => setOpen(true)}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search product...'
        className='w-full rounded-lg border px-3 py-2'
      />

      {open && (
        <div className='absolute z-50 mt-2 max-h-80 w-full overflow-auto rounded-lg border bg-white shadow-lg'>
          <button
            type='button'
            onClick={onCreateNew}
            className='w-full border-b px-4 py-3 text-left font-semibold text-blue-600 hover:bg-slate-50'
          >
            + Add New Product
          </button>

          {filteredProducts.map((product) => (
            <button
              key={product.id}
              type='button'
              onClick={() => {
                onSelect(product);
                setKeyword('');
                setOpen(false);
              }}
              className='flex w-full flex-col px-4 py-3 text-left hover:bg-slate-100'
            >
              <span className='font-medium'>
                {product.name}
              </span>

              <span className='text-sm text-slate-500'>
                {product.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
