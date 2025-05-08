'use client';

import { Paper, Typography, Box } from '@mui/material';

export default function StatCard({ title, value, icon, color, height = 160 }) {
  return (
    <Paper
      elevation={2}
      sx={{
        flex: 1,
        minWidth: 0,
        p: 4,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
        <Box
          sx={{
            bgcolor: color,
            color: 'white',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500, mt: 1 }}>
        {title}
      </Typography>
    </Paper>
  );
}
