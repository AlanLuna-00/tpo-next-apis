'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import useGetProducts from '@/hooks/products/useGetProducts';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products } = useGetProducts();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/carts');
      if (!response.ok) {
        throw new Error('Error al cargar las órdenes');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('No se pudieron cargar las órdenes. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 1, md: 2 }, py: 2 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Carritos Activos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario ID</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Total Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay órdenes disponibles
                </TableCell>
              </TableRow>
            ) : (
              orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {order.items.map((item, index) => {
                        const prod = products.find(p => p.id == item.productId);
                        return (
                          <Chip
                            key={index}
                            label={`${prod ? prod.name : item.productId} (${item.quantity})`}
                            size="small"
                            variant="outlined"
                          />
                        );
                      })}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.items.reduce((total, item) => total + item.quantity, 0)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
