'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: null,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = 'El precio debe ser mayor a 0';
    if (!formData.stock || Number(formData.stock) < 0)
      newErrors.stock = 'El stock no puede ser negativo';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      if (response.ok) {
        router.push('/backoffice/products');
      } else {
        setError('No se pudo guardar el producto.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('No se pudo guardar el producto.');
    }
  };

  return (
    <Box sx={{ px: { xs: 1, md: 2 }, py: 2 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Editar Producto
      </Typography>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                />

                <TextField
                  label="Precio"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  fullWidth
                />

                <TextField
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
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
                  error={!!errors.stock}
                  helperText={errors.stock}
                  fullWidth
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button variant="outlined" onClick={() => router.push('/backoffice/products')}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained">
                    Guardar Cambios
                  </Button>
                </Box>
              </Box>
            </form>
          </>
        )}
      </Paper>
    </Box>
  );
}
