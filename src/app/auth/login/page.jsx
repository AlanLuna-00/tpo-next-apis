"use client"
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import useLogin from "@/hooks/auth/useLogin";

const LoginPage = () => {
  const { login, error, user, token } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);

    if (error) {
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={error || "Usuario logueado satisfactoriamente"}
      />

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
