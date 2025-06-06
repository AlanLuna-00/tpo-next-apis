'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async product => {
    const { data } = await axios.get(`http://localhost:3001/products/${product.id}`);

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      }
      return [...prevCart, product];
    });

    return axios.patch(`http://localhost:3001/products/${product.id}`, {
      stock: data.stock - 1,
    });
  };

  const removeFromCart = async productId => {
    const { data } = await axios.get(`http://localhost:3001/products/${productId}`);

    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    const product = cart.find(item => item.id === productId);
    if (product) {
      await axios.patch(`http://localhost:3001/products/${productId}`, {
        stock: data.stock + product.quantity,
      });
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    cart.forEach(async product => {
      const { data } = await axios.get(`http://localhost:3001/products/${product.id}`);
      await axios.patch(`http://localhost:3001/products/${product.id}`, {
        stock: data.stock + product.quantity,
      });
    });
  };

  const checkoutCart = async () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, checkoutCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}
