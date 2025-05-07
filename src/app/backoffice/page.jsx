'use client';

import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { ShoppingCart, People, AttachMoney } from '@mui/icons-material';

export default function BackofficeDashboard() {
    const [stats, setStats] = useState({
        totalSales: 0,
        activeUsers: 0,
        pendingOrders: 0
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
                            if (prod && prod.price) {
                                totalSales += prod.price * item.quantity;
                            }
                        }
                    });
                });
                setStats({
                    totalSales,
                    activeUsers: users.length,
                    pendingOrders: carts.length
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    const StatCard = ({ title, value, icon }) => (
        <Paper className="p-4">
            <Box className="flex items-center justify-between">
                <Box>
                    <Typography variant="h6" color="textSecondary">
                        {title}
                    </Typography>
                    <Typography variant="h4" className="mt-2">
                        {value}
                    </Typography>
                </Box>
                <Box className="text-primary">
                    {icon}
                </Box>
            </Box>
        </Paper>
    );

    return (
        <div className="p-6">
            <Typography variant="h4" className="mb-6">
                Dashboard
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <StatCard 
                        title="Ventas Totales" 
                        value={`$${stats.totalSales}`} 
                        icon={<AttachMoney sx={{ fontSize: 40 }} />} 
                    />
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <StatCard 
                        title="Usuarios Activos" 
                        value={stats.activeUsers} 
                        icon={<People sx={{ fontSize: 40 }} />} 
                    />
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <StatCard 
                        title="Órdenes Pendientes" 
                        value={stats.pendingOrders} 
                        icon={<ShoppingCart sx={{ fontSize: 40 }} />} 
                    />
                </Grid>
            </Grid>
        </div>
    );
}