'use client';
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import useLogout from '@/hooks/auth/useLogout';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { logout, isLoggingOut } = useLogout();

  const { role } = useAuth();
  const showBackoffice = role === 'admin';

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  if (!isClient || pathname === '/auth/login') {
    return null;
  }
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Typography variant="h6" component="div">
            APIS - UADE
          </Typography>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/products">
            Productos
          </Button>
          <Button color="inherit" component={Link} href="/cart/123">
            Carrito
          </Button>
          {showBackoffice && (
            <Button color="inherit" component={Link} href="/backoffice">
              Backoffice (Only Admin)
            </Button>
          )}
        </Box>
        <IconButton edge="end" color="inherit" onClick={handleClickOpen}>
          <AccountCircle />
        </IconButton>
      </Toolbar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Cierre de Sesión</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas cerrar sesión? Se eliminarán tus datos de sesión.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="primary" disabled={isLoggingOut}>
            {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
