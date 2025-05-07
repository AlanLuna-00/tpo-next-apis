'use client';

import { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';

export default function CartByUser({ params }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://localhost:3001/carts?userId=${params.id}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setCartItems(data[0].items);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setLoading(false);
            }
        };

        fetchCart();
    }, [params.id]);

    if (loading) {
        return <Typography>Cargando carrito...</Typography>;
    }

    return (
        <div className="p-6">
            <Typography variant="h4" className="mb-6">
                Carrito de Compras
            </Typography>

            <Paper className="p-6">
                {cartItems.length === 0 ? (
                    <Typography>El carrito está vacío</Typography>
                ) : (
                    <Box>
                        {cartItems.map((item, index) => (
                            <Box key={index} className="mb-4 p-4 border-b">
                                <Typography>Producto ID: {item.productId}</Typography>
                                <Typography>Cantidad: {item.quantity}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>
        </div>
    );
}