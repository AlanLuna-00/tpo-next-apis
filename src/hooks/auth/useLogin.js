import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useLogin = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:3001/users');
      const users = res.data;

      const loggedInUser = users.find(user => user.email === email && user.password === password);

      if (loggedInUser) {
        const generatedToken = Math.random().toString(36).substring(7);
        setUser(loggedInUser);
        setToken(generatedToken);
        Cookies.set('role', loggedInUser.role, { expires: 1 });
        Cookies.set('token', generatedToken, { expires: 1 });
        router.push('/');
      } else {
        setError('Crendenciales incorrectas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    token,
    login,
    error,
    isLoading,
  };
};

export default useLogin;
