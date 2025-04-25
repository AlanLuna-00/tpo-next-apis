'use client'
import {useState} from "react";
import { useEffect } from "react";
import axios from "axios";
const useGetProductById = (id) => {

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProductById = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductById();
    }, []);

    return { product, loading };
}

export default useGetProductById;