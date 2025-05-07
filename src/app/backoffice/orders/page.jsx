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
  Alert
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
      <div className="p-6 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-6">
        Órdenes
      </Typography>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Paper>
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
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>
                    {order.items.map((item, index) => {
                      const prod = products.find(p => p.id == item.productId);
                      return (
                        <Chip 
                          key={index}
                          label={`${prod ? prod.name : item.productId} (${item.quantity})`}
                          className="mr-2 mb-2"
                        />
                      );
                    })}
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
    </div>
  );
} 