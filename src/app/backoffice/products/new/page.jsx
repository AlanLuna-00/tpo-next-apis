'use client';

import { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
    url: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'El nombre es requerido';
    if (!formData.price || formData.price <= 0) return 'El precio debe ser mayor a 0';
    if (!formData.stock || formData.stock < 0) return 'El stock no puede ser negativo';
    if (!formData.category || formData.category.trim() === '') return 'La categoría es requerida';
    if (!formData.url || formData.url.trim() === '')
      return 'La URL de la imagen es requerida o invalida';
    return null;
  };

  const handleSubmit = async e => {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      if (!response.ok) throw new Error('Error al crear el producto');

      router.push('/backoffice/products');
    } catch (error) {
      console.error(error);
      setError('No se pudo crear el producto. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ px: { xs: 1, md: 2 }, py: 2 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Nuevo Producto
      </Typography>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              fullWidth
            />
            <TextField
              label="Precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              disabled={loading}
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
            />
            <TextField
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={loading}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
              disabled={loading}
              fullWidth
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Categoría"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loading}
              fullWidth
            />
            <TextField
              label="URL de la imagen"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              disabled={loading}
              fullWidth
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Creando...' : 'Crear Producto'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
