'use client';
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
<<<<<<< Updated upstream
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const pathname = usePathname();
  const { logout, isLoggingOut } = useLogout();
=======

  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);

  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const pathname = usePathname();
  const { logout, isLoggingOut } = useLogout();

>>>>>>> Stashed changes
  const { cart, removeFromCart } = useCart();

  const { role, token } = useAuth();
<<<<<<< Updated upstream
  const showBackoffice = role === 'admin';

=======

  const showBackoffice = role === 'admin';


>>>>>>> Stashed changes
  useEffect(() => {
    setIsClient(true);
  }, []);

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  const handleClickOpen = () => {
    setOpen(true);
  };

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  const handleClose = () => {
    setOpen(false);
  };

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  const handleLogout = () => {
    handleClose();
    logout();
  };

<<<<<<< HEAD
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======

>>>>>>> Stashed changes
=======
>>>>>>> 47b6d6c9cd60108a2a64d1a324b04ce8dda4c8c3
  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

<<<<<<< Updated upstream
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const isLoggedIn = !!token;

=======

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);


  const isLoggedIn = !!token;


>>>>>>> Stashed changes
  if (!isClient) {
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

          {isLoggedIn && (
            <>
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
            </>
          )}
        </Box>

        {isLoggedIn && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
<<<<<<< Updated upstream
=======
            {}
>>>>>>> Stashed changes
            <IconButton 
              color="inherit" 
              onClick={handleCartClick}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

<<<<<<< Updated upstream
=======
            {}
>>>>>>> Stashed changes
            <IconButton edge="end" color="inherit" onClick={handleClickOpen}>
              <AccountCircle />
            </IconButton>
          </Box>
        )}
      </Toolbar>

<<<<<<< Updated upstream
=======
      {}
>>>>>>> Stashed changes
      <Menu
        anchorEl={cartAnchorEl}
        open={Boolean(cartAnchorEl)}
        onClose={handleCartClose}
        slotProps={{ paper: { sx: { width: 320, maxHeight: 400 } } }}
      >
        {cart.length === 0 ? (
          <MenuItem disabled>El carrito está vacío</MenuItem>
        ) : (
<<<<<<< Updated upstream
          <>
=======
          <Box>
            {}
>>>>>>> Stashed changes
            {cart.map((item) => (
              <MenuItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ListItemText 
                    primary={item.name} 
                    secondary={`Cantidad: ${item.quantity}`} 
                  />
                  <Typography variant="body2">
                    ${item.price * item.quantity}
                  </Typography>
                </Box>
                <ListItemIcon>
                  <IconButton 
                    edge="end" 
                    onClick={() => removeFromCart(item.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemIcon>
              </MenuItem>
            ))}
            <Divider />
<<<<<<< Updated upstream
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">${totalPrice}</Typography>
            </MenuItem>
=======
            {}
            <MenuItem>
              <ListItemText 
                primary={`Total: $${totalPrice}`}
                slotProps={{ primary: { sx: { fontWeight: 'bold' } } }}
              />
            </MenuItem>
            {}
>>>>>>> Stashed changes
            <MenuItem 
              component={Link} 
              href="/cart"
              onClick={handleCartClose}
              sx={{ justifyContent: 'center' }}
            >
              Ver carrito
            </MenuItem>
          </>
        )}
      </Menu>

<<<<<<< HEAD
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
      {}
>>>>>>> Stashed changes
=======
>>>>>>> 47b6d6c9cd60108a2a64d1a324b04ce8dda4c8c3
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
