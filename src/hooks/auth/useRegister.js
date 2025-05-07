import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useRegister = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const register = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:3001/users', {
        email,
        password,
        role: 'user',
      });

      const registeredUser = res.data;

      if (registeredUser) {
        const generatedToken = Math.random().toString(36).substring(7);
        setUser(registeredUser);
        setToken(generatedToken);
        Cookies.set('role', registeredUser.role, { expires: 1 });
        Cookies.set('token', generatedToken, { expires: 1 });
        router.push('/');
      }
    } catch (err) {
      setError('Error al registrar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    token,
    register,
    error,
    isLoading,
  };
};

export default useRegister;
