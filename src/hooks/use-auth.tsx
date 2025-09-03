
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Mock user and user data types
interface User {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
}

interface UserProfile {
    uid: string;
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      pincode: string;
    };
}

interface AuthContextType {
  user: User | null;
  userData: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string, name?: string, phone?: string) => boolean;
  logout: () => void;
}

const mockUser: User = {
    uid: 'dummy-user-id-123',
    email: 'test@example.com',
    displayName: 'Dummy User',
    phone: '9876543210'
};

const mockUserProfile: UserProfile = {
    uid: 'dummy-user-id-123',
    name: 'Dummy User',
    email: 'test@example.com',
    phone: '9876543210',
    address: {
        street: '123, CIT Market, Kasba',
        city: 'Kolkata',
        pincode: '700042',
    }
}

const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    userData: null, 
    loading: true,
    login: () => false,
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a dummy user session exists in localStorage
    const session = localStorage.getItem('dummy-user-session');
    if (session) {
        try {
            const parsedSession = JSON.parse(session);
            setUser(parsedSession.user);
            setUserData(parsedSession.userData);
        } catch (e) {
            localStorage.removeItem('dummy-user-session');
        }
    }
    setLoading(false);
  }, []);

  const login = (email: string, pass: string, name?: string, phone?: string): boolean => {
    // In a real app, you'd validate credentials. Here, we just log in.
    setLoading(true);
    const newUser = { ...mockUser, email, ...(name && { displayName: name }), ...(phone && { phone }) };
    const newUserProfile = { ...mockUserProfile, email, name: name || 'Dummy User', phone: phone || '9876543210' };
    
    setUser(newUser);
    setUserData(newUserProfile);
    
    localStorage.setItem('dummy-user-session', JSON.stringify({ user: newUser, userData: newUserProfile }));
    setLoading(false);
    return true;
  }
  
  const logout = () => {
    setLoading(true);
    setUser(null);
    setUserData(null);
    localStorage.removeItem('dummy-user-session');
    setLoading(false);
  }


  return (
    <AuthContext.Provider value={{ user, userData, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
