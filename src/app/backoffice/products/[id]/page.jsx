'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';

export default function EditProduct({}) {
  const { id } = useParams();

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/backoffice/products');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-6">
        Editar Producto
      </Typography>

      <Paper className="p-6">
        <form onSubmit={handleSubmit}>
          <Box className="space-y-4">
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
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
            />

            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <Box className="flex justify-end space-x-4">
              <Button variant="outlined" onClick={() => router.push('/backoffice/products')}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Guardar Cambios
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </div>
  );
}
