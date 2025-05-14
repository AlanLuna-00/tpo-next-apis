'use client';
import { useState } from 'react';
import TableProducts from '@/components/products/TableProducts';
import useGetProducts from '@/hooks/products/useGetProducts';
import MenuItem from '@mui/material/MenuItem';
import { Box, FormControl, InputLabel, Select } from '@mui/material';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryForQuery = selectedCategory === 'all' ? undefined : selectedCategory;
  const { products, loading: isLoading, categories } = useGetProducts(categoryForQuery);

  return (
    <div>
      <h1>Products</h1>

      <Box sx={{ mt: 3, mb: 3, maxWidth: 300 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="category-select-label">Categoría</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Categoría"
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="all">Todas</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableProducts products={products} isLoading={isLoading} />
    </div>
  );
}
