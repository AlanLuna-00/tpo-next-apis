'use client';
import useGetProductById from '@/hooks/products/useGetProductById';
import DetailProduct from '@/components/products/DetailProduct';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

export default function ProductById() {
  const { id } = useParams();
  const { product, loading: isLoading, refetch } = useGetProductById(id);
  const { addToCart } = useCart();

  return (
    <div>
      <h1>Product By Id</h1>
      <DetailProduct
        product={product}
        isLoading={isLoading}
        addToCart={addToCart}
        refetch={refetch}
      />
    </div>
  );
}
