'use client';

import { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Link from 'next/link';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('No se pudieron cargar los productos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('No se pudo eliminar el producto. Por favor, intente nuevamente.');
      }
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Productos
        </Typography>
        <Link href="/backoffice/products/new" passHref>
          <Button variant="contained" startIcon={<Add />}>
            Nuevo Producto
          </Button>
        </Link>
      </Box>

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
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay productos disponibles
                </TableCell>
              </TableRow>
            ) : (
              products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell align="right">
                    <Link href={`/backoffice/products/${product.id}`} passHref>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton color="error" onClick={() => handleDelete(product.id)}>
                      <Delete />
                    </IconButton>
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
