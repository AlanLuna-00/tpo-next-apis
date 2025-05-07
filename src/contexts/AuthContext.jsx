'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const tokenCookie = Cookies.get('token');
    const roleCookie = Cookies.get('role');

    if (tokenCookie) {
      setRole(roleCookie);
      setToken(tokenCookie);
    } else {
      router.push('/auth/login');
    }

    if (roleCookie !== 'admin' && pathname.startsWith('/backoffice')) {
      router.push('/');
    }

    setLoading(false);
  }, [pathname, router]);

  if (loading) {
    return null;
  }

  const value = {
    role,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
