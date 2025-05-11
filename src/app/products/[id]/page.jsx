'use client'
import useGetProductById from "@/hooks/products/useGetProductById";
import DetailProduct from "@/components/products/DetailProduct";
import { useParams} from "next/navigation";

export default function ProductById({ params }) {
    const { id } = useParams();
    const {product, loading: isLoading} = useGetProductById(id)
    return (
        <div>
            <h1>Product By Id</h1>
            <DetailProduct product={product} isLoading={isLoading} />
        </div>
    )
}