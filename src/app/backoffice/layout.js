'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory2 as ProductsIcon,
  People as UsersIcon,
  ShoppingCart as OrdersIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BackofficeLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/backoffice' },
    { text: 'Productos', icon: <ProductsIcon />, path: '/backoffice/products' },
    { text: 'Usuarios', icon: <UsersIcon />, path: '/backoffice/users' },
    { text: 'Carritos', icon: <OrdersIcon />, path: '/backoffice/orders' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          py: 2,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Backoffice
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {menuItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} passHref style={{ textDecoration: 'none' }}>
                <Button
                  variant={isActive ? 'contained' : 'outlined'}
                  color={isActive ? 'primary' : 'inherit'}
                  startIcon={item.icon}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: isActive ? 'primary.main' : 'grey.300',
                    bgcolor: isActive ? 'primary.main' : 'white',
                    color: isActive ? 'white' : 'text.primary',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.dark' : 'grey.100',
                    },
                  }}
                >
                  {item.text}
                </Button>
              </Link>
            );
          })}
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        {children}
      </Paper>
    </Box>
  );
}
