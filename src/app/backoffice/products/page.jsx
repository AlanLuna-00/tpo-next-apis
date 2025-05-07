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
  Alert
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

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`, {
          method: 'DELETE'
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
      <div className="p-6 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">
          Productos
        </Typography>
        <Link href="/backoffice/products/new">
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
          >
            Nuevo Producto
          </Button>
        </Link>
      </div>

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
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Acciones</TableCell>
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
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Link href={`/backoffice/products/${product.id}`}>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton 
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Delete />
                    </IconButton>
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