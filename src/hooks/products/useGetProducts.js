'use client'
import {useState} from "react";
import { useEffect } from "react";
import axios from "axios";


const useGetProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3001/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return { products, loading };
}

export default useGetProducts;