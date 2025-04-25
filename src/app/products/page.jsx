'use client'
import TableProducts from "@/components/products/TableProducts";
import useGetProducts from "@/hooks/products/useGetProducts";

export default function Products() {

    const { products, loading: isLoading } = useGetProducts()

    return (
        <div>
            <h1>Products</h1>
            {<TableProducts products={products} isLoading={isLoading} />}
        </div>
    )
}