import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const logout = () => {
    try {
      setIsLoggingOut(true);

      Cookies.remove('role');
      Cookies.remove('token');

      router.push('/auth/login');
    } catch (err) {
      setError('Error al cerrar sesión');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
    error,
  };
};

export default useLogout;
