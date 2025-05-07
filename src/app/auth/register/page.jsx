'use client';
import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar } from '@mui/material';
import useRegister from '@/hooks/auth/useRegister';
import Link from 'next/link';

const RegisterPage = () => {
  const { register, error, isLoading } = useRegister();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegister = async e => {
    e.preventDefault();
    await register(email, password);

    if (error) {
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={error || 'Usuario registrado satisfactoriamente'}
      />

      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </form>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <span>¿Ya tienes cuenta? </span>
        <Link href="/auth/login">Inicia sesión aquí</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
