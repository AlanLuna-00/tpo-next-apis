import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from 'next/link'

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
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
          <Button color="inherit" component={Link} href="/backoffice">
            Backoffice (Only Admin)
          </Button>
        </Box>

        <IconButton edge="end" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
