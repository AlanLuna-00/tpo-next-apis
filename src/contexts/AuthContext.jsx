'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const tokenCookie = Cookies.get('token');

    if (userCookie && tokenCookie) {
      setUser(JSON.parse(userCookie));
      setToken(tokenCookie);
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const value = {
    user,
    token,
    setUser,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
