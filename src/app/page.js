'use client';

import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { ShoppingCart, People, AttachMoney } from '@mui/icons-material';
import StatCard from '@/components/backoffice/StatCard';

export default function BackofficeDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    activeUsers: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersRes = await fetch('http://localhost:3001/users');
        const users = await usersRes.json();
        const productsRes = await fetch('http://localhost:3001/products');
        const products = await productsRes.json();
        const cartsRes = await fetch('http://localhost:3001/carts');
        const carts = await cartsRes.json();

        let totalSales = 0;
        carts.forEach(cart => {
          cart.items.forEach(item => {
            if (item.price && item.quantity) {
              totalSales += item.price * item.quantity;
            } else if (item.productId && item.quantity) {
              const prod = products.find(p => p.id == item.productId);
              if (prod?.price) {
                totalSales += prod.price * item.quantity;
              }
            }
          });
        });

        setStats({
          totalSales,
          activeUsers: users.length,
          pendingOrders: carts.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const cardData = [
    {
      title: 'Ventas Totales',
      value: `$${stats.totalSales}`,
      icon: <AttachMoney />,
      color: '#2e7d32',
    },
    {
      title: 'Usuarios Activos',
      value: stats.activeUsers,
      icon: <People />,
      color: '#1976d2',
    },
    {
      title: 'Órdenes Pendientes',
      value: stats.pendingOrders,
      icon: <ShoppingCart />,
      color: '#ef6c00',
    },
  ];

  return (
    <Box sx={{ px: { xs: 1, md: 2 }, py: 2 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
        }}
      >
        {cardData.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </Box>
    </Box>
  );
}
