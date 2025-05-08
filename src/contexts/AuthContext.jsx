'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const tokenCookie = Cookies.get('token');
    const roleCookie = Cookies.get('role');
    const userIdCookie = Cookies.get('userId');

    setToken(tokenCookie || null);
    setRole(roleCookie || null);
    setUserId(userIdCookie || null);

    if (roleCookie !== 'admin' && pathname.startsWith('/backoffice')) {
      router.push('/');
    }

    if (!tokenCookie && pathname !== '/auth/login' && pathname !== '/auth/register') {
      router.push('/auth/login');
    }

    if (tokenCookie && (pathname === '/auth/login' || pathname === '/auth/register')) {
      router.push('/');
    }

    setLoading(false);
  }, [pathname, router]);

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('userId');
    setToken(null);
    setRole(null);
    setUserId(null);
    router.push('/auth/login');
  };

  if (loading) return null;

  const value = {
    token,
    role,
    userId,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
