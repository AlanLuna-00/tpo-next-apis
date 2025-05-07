'use client';

import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'El nombre es requerido';
    if (!formData.price || formData.price <= 0) return 'El precio debe ser mayor a 0';
    if (!formData.stock || formData.stock < 0) return 'El stock no puede ser negativo';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      router.push('/backoffice/products');
    } catch (error) {
      console.error('Error creating product:', error);
      setError('No se pudo crear el producto. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-6">
        Nuevo Producto
      </Typography>

      <Paper className="p-6">
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box className="space-y-4">
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              disabled={loading}
              slotProps={{ input: { min: 0, step: 0.01 } }}
            />

            <TextField
              fullWidth
              label="Descripción"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
              disabled={loading}
              slotProps={{ input: { min: 0 } }}
            />

            <Box className="flex justify-end space-x-4">
              <Button 
                variant="outlined" 
                onClick={() => router.push('/backoffice/products')}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Creando...' : 'Crear Producto'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </div>
  );
} 