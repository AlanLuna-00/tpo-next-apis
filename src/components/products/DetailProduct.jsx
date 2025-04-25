import { Card, CardContent, CardActions, Typography, Button, CircularProgress, Box } from '@mui/material';

const DetailProduct = ({ product, onAddToCart, isLoading }) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

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
        <Typography color={product?.stock > 0 ? 'text.primary' : 'error'}>
          Stock: {product?.stock > 0 ? product?.stock : 'Sin stock'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(product?.id)}
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