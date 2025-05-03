import { useState } from 'react';
import axios from 'axios';

const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (email, password, role) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
    setIsLoading(true);
      if (storedUser && storedUser.role === 'admin') {
        const newUser = { email, password, role, id: Date.now() };

        const res = await axios.post('http://localhost:3001/users', newUser);

        if (res.status === 201) {
          alert('Usuario registrado satisfactoriamente');
        }
      } else {
        setError('Solo los administradores pueden registrar nuevos usuarios');
      }
    } catch (err) {
      setError('Error al registrar el usuario');
    }
    finally {
        setIsLoading(false);
    }
  };

  return {
    register,
    error,
      isLoading
  };
};

export default useRegister;
