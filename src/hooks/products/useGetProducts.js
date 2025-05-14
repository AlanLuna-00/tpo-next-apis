'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const useGetProducts = category => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const url = category
        ? `http://localhost:3001/products?category=${encodeURIComponent(category)}`
        : `http://localhost:3001/products`;
      const response = await axios.get(url);
      setProducts(response.data);
      if (!category) {
        const all = response.data;
        const uniqueCategories = Array.from(new Set(all.map(p => p.category)));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  return { products, categories, loading };
};

export default useGetProducts;
