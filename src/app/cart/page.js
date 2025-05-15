'use client';

import { useCart } from '@/contexts/CartContext';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, checkoutCart } = useCart();
  const { userId } = useAuth();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const saveCartToBackend = async () => {
    if (!userId) {
      alert('No se pudo identificar el usuario.');
      return;
    }
    const items = cart.map(item => ({
      ...item,
      id: item.id,
      productId: item.productId ? item.productId : item.id,
    }));
    // Siempre crea una nueva orden (POST)
    await fetch('http://localhost:3001/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items }),
    });
    checkoutCart();
    alert('¡Compra realizada!');
    router.push('/');
  };

  if (cart.length === 0) {
    return (
      <Container>
        <Typography variant="h5" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Button variant="contained" onClick={() => router.push('/products')}>
          Ver productos
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Carrito de Compras
      </Typography>

      <List>
        {cart.map(item => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.name}
              secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Total: ${total}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 1 }}
          onClick={saveCartToBackend}
        >
          Proceder al Checkout
        </Button>
        <Button variant="outlined" color="error" fullWidth onClick={clearCart}>
          Vaciar Carrito
        </Button>
      </Box>
    </Container>
  );
}
