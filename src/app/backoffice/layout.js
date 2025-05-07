'use client';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  People as UsersIcon,
  Receipt as OrdersIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BackofficeLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/backoffice' },
    { text: 'Productos', icon: <ProductsIcon />, path: '/backoffice/products' },
    { text: 'Usuarios', icon: <UsersIcon />, path: '/backoffice/users' },
    { text: 'Órdenes', icon: <OrdersIcon />, path: '/backoffice/orders' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Backoffice
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                style={{ textDecoration: 'none' }}
              >
                <Button 
                  color="inherit"
                  startIcon={item.icon}
                  sx={{ 
                    backgroundColor: pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  }}
                >
                  {item.text}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </div>
  );
} 