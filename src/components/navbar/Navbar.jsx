'use client';

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import { useCart } from '@/contexts/CartContext';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);

  const { cart } = useCart();
  const { role, token, logout } = useAuth();

  const isLoggedIn = !!token;
  const showBackoffice = role === 'admin';

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
  };

  const handleCartClick = event => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  if (!isClient) return null;

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Typography variant="h6" component="div">
              APIS - UADE
            </Typography>

            <Button color="inherit" component={Link} href="/">
              Home
            </Button>

            {isLoggedIn && (
              <>
                <Button color="inherit" component={Link} href="/products">
                  Productos
                </Button>
                <Button color="inherit" component={Link} href="/cart">
                  Carrito
                </Button>
                {showBackoffice && (
                  <Button color="inherit" component={Link} href="/backoffice">
                    Backoffice (Only Admin)
                  </Button>
                )}
              </>
            )}
          </Box>

          {isLoggedIn && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit" onClick={handleCartClick} sx={{ mr: 1 }}>
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton edge="end" color="inherit" onClick={handleClickOpen}>
                <AccountCircle />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Menu anchorEl={cartAnchorEl} open={Boolean(cartAnchorEl)} onClose={handleCartClose}>
        {cart.length === 0 ? (
          <MenuItem disabled>El carrito está vacío</MenuItem>
        ) : (
          <Box>
            {cart.map(item => (
              <MenuItem
                key={item.id}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>{item.name}</Typography>
                  <Typography>x{item.quantity}</Typography>
                </Box>
                <Typography>${item.price * item.quantity}</Typography>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">${totalPrice}</Typography>
            </MenuItem>
            <MenuItem component={Link} href="/cart">
              Ver carrito
            </MenuItem>
          </Box>
        )}
      </Menu>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Cierre de Sesión</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas cerrar sesión? Se eliminarán tus datos de sesión.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="primary">
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
