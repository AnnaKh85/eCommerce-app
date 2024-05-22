import { CircularProgress } from '@mui/material';

import type { IProduct } from '../../services/interfaces.ts';
import ProductCard from './ProductCard.tsx';
import { useProducts } from './useProducts.ts';

export default function ProductList() {
  const { isLoading, products, error } = useProducts();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      {products &&
        products.results.map((product: IProduct) => {
          return <ProductCard product={product} key={product.id} />;
        })}
    </>
  );
}
