'use client';

import { CssBaseline, Container, Box } from '@mui/material';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/navbar/Navbar';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ py: 4 }}>
          <Container maxWidth="md">{children}</Container>
        </Box>
      </CartProvider>
    </AuthProvider>
  );
}
