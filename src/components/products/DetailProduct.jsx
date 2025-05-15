import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import { useCart } from '@/contexts/CartContext';

const DetailProduct = ({ product, isLoading, addToCart }) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        productId: product.id,
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {product?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {product?.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Precio: ${product?.price}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          Categoría: {product?.category}
        </Typography>

        <Typography color={product?.stock > 0 ? 'text.primary' : 'error'}>
          Stock: {product?.stock > 0 ? product?.stock : 'Sin stock'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          disabled={product?.stock <= 0}
          fullWidth
        >
          Agregar al Carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export default DetailProduct;
